import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  StartEventNode,
  EndEventNode,
  IntermediateEventNode,
  TaskNode,
  GatewayNode,
  PoolHeaderNode,
  LaneBackgroundNode,
  AnnotationNode,
} from './components/BpmnNodes';
import { nodes as initialNodes, edges as initialEdges } from './data/diagramData';

const nodeTypes = {
  startEvent: StartEventNode,
  endEvent: EndEventNode,
  intermediateEvent: IntermediateEventNode,
  task: TaskNode,
  gateway: GatewayNode,
  poolHeader: PoolHeaderNode,
  laneBg: LaneBackgroundNode,
  annotation: AnnotationNode,
};

const stages = [
  {
    num: 1,
    title: 'Инициация процесса',
    actor: 'Фермер',
    color: 'emerald',
    description: 'Фермер принимает решение о реализации сельхозпродукции через цифровую платформу и формирует лот.',
    details: [
      'Описание продукции (вид, сорт, качество)',
      'Количество/объём',
      'Цена и условия поставки',
      'Сроки реализации',
      'Фотографии и документация',
    ],
  },
  {
    num: 2,
    title: 'Модерация и публикация',
    actor: 'Цифровая платформа',
    color: 'indigo',
    description: 'Платформа проверяет данные, верифицирует документы и публикует лот в каталоге.',
    details: [
      'Проверка корректности данных',
      'Верификация документов фермера',
      'Проверка соответствия требованиям',
      'Публикация лота в каталоге',
    ],
  },
  {
    num: 3,
    title: 'Выбор лота',
    actor: 'Покупатель',
    color: 'amber',
    description: 'Покупатель просматривает каталог, сравнивает предложения и принимает решение через XOR-шлюз.',
    details: [
      'Поиск подходящей продукции',
      'Изучение характеристик лотов',
      'Сравнение предложений',
      'Решение: заинтересован / не заинтересован',
    ],
  },
  {
    num: 4,
    title: 'Оплата и смарт-контракт',
    actor: 'Покупатель → Платформа',
    color: 'blue',
    description: 'Покупатель оплачивает лот и подписывает смарт-контракт. Платформа подтверждает оплату.',
    details: [
      'Инициирование оплаты',
      'Подписание смарт-контракта',
      'Проверка поступления средств',
      'Верификация условий контракта',
    ],
  },
  {
    num: 5,
    title: 'Завершение сделки',
    actor: 'Фермер',
    color: 'emerald',
    description: 'Фермер получает уведомление об оплате, подготавливает и отгружает продукцию покупателю.',
    details: [
      'Подготовка продукции к отгрузке',
      'Упаковка по требованиям',
      'Организация доставки/самовывоза',
      'Передача сопроводительных документов',
    ],
  },
];

function InfoPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="absolute top-0 right-0 w-[340px] h-full bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-xl z-50 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-900">Описание процесса</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {stages.map((stage) => {
            const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
              emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700' },
              indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', badge: 'bg-indigo-100 text-indigo-700' },
              amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700' },
              blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700' },
            };
            const colors = colorClasses[stage.color] || colorClasses.blue;
            
            return (
              <div key={stage.num} className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${colors.badge}`}>
                    Этап {stage.num}
                  </span>
                  <span className="text-[10px] text-gray-500">{stage.actor}</span>
                </div>
                <h3 className={`text-sm font-semibold ${colors.text} mb-1`}>{stage.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{stage.description}</p>
                <ul className="space-y-0.5">
                  {stage.details.map((detail, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
                      <span className="text-gray-400 mt-0.5">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BpmnDiagram({ onToggleInfo }: { onToggleInfo: () => void }) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [showLegend, setShowLegend] = useState(true);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  const onInit = useCallback(() => {
    // Initial setup
  }, []);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        proOptions={proOptions}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.2}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          style={{ backgroundColor: '#f8fafc' }}
        />

        {/* Legend */}
        {showLegend && (
          <Panel position="bottom-left">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-[250px]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold text-gray-800">Легенда BPMN 2.0</h3>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  </div>
                  <span className="text-gray-700">Начальное событие</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-yellow-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full border border-yellow-600" />
                  </div>
                  <span className="text-gray-700">Промежуточное событие</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border-[3px] border-red-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  </div>
                  <span className="text-gray-700">Конечное событие</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-4 rounded border-2 border-blue-500 bg-blue-50 flex-shrink-0" />
                  <span className="text-gray-700">Задача (активность)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rotate-45 border-2 border-orange-500 bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <span className="-rotate-45 text-[6px] font-bold text-orange-600">✕</span>
                  </div>
                  <span className="text-gray-700">XOR-шлюз (эксклюзивный)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 border-t-2 border-gray-600 flex-shrink-0" />
                  <span className="text-gray-700">Поток управления</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 border-t-2 border-dashed border-indigo-500 flex-shrink-0" />
                  <span className="text-gray-700">Поток сообщений</span>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {!showLegend && (
          <Panel position="bottom-left">
            <button
              onClick={() => setShowLegend(true)}
              className="bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              📋 Легенда
            </button>
          </Panel>
        )}

        {/* Info button */}
        <Panel position="top-right">
          <button
            onClick={onToggleInfo}
            className="bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Описание этапов
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}



export default function App() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2.5 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">
                BPMN 2.0 — Реализация сельхозпродукции
              </h1>
              <p className="text-[10px] text-gray-500">
                Бизнес-процесс: цифровая платформа • Стандарт OMG BPMN 2.0
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] text-gray-600">Фермер</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                <span className="text-[11px] text-gray-600">Платформа</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-[11px] text-gray-600">Покупатель</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Diagram area */}
      <div className="flex-1 relative overflow-hidden">
        <BpmnDiagram onToggleInfo={() => setShowInfo(!showInfo)} />
        <InfoPanel isOpen={showInfo} onClose={() => setShowInfo(false)} />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-1.5 flex-shrink-0">
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <span>Участники: Фермер (продавец) | Цифровая платформа (маркетплейс) | Покупатель (заказчик)</span>
          <span>🖱️ Масштабирование колёсиком • Перетаскивание для навигации</span>
        </div>
      </footer>
    </div>
  );
}
