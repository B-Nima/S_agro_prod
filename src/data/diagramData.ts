import type { Node, Edge } from '@xyflow/react';
import { MarkerType } from '@xyflow/react';

// Layout constants
const POOL_HEADER_WIDTH = 55;
const LANE_HEIGHT = 180;
const START_X = 80;
const NODE_SPACING = 180;

// Pool Y positions (top of each lane content area)
const FARMER_Y = 0;
const PLATFORM_Y = LANE_HEIGHT;
const BUYER_Y = LANE_HEIGHT * 2;
const TOTAL_WIDTH = 1600;

export const nodes: Node[] = [
  // ===== POOL BACKGROUNDS (Lane areas) =====
  {
    id: 'lane-farmer-bg',
    type: 'laneBg',
    position: { x: POOL_HEADER_WIDTH, y: FARMER_Y },
    data: { color: 'green', label: 'Фермер (продавец сельскохозяйственной продукции)' },
    style: { width: TOTAL_WIDTH, height: LANE_HEIGHT },
    draggable: false,
    selectable: false,
    zIndex: -1,
  },
  {
    id: 'lane-platform-bg',
    type: 'laneBg',
    position: { x: POOL_HEADER_WIDTH, y: PLATFORM_Y },
    data: { color: 'indigo', label: 'Цифровая платформа (посредник-маркетплейс)' },
    style: { width: TOTAL_WIDTH, height: LANE_HEIGHT },
    draggable: false,
    selectable: false,
    zIndex: -1,
  },
  {
    id: 'lane-buyer-bg',
    type: 'laneBg',
    position: { x: POOL_HEADER_WIDTH, y: BUYER_Y },
    data: { color: 'amber', label: 'Покупатель (заказчик продукции)' },
    style: { width: TOTAL_WIDTH, height: LANE_HEIGHT },
    draggable: false,
    selectable: false,
    zIndex: -1,
  },

  // ===== POOL HEADERS =====
  {
    id: 'pool-farmer',
    type: 'poolHeader',
    position: { x: 0, y: FARMER_Y },
    data: { label: 'Фермер', poolType: 'farmer' },
    style: { width: POOL_HEADER_WIDTH, height: LANE_HEIGHT },
    draggable: false,
    selectable: false,
    zIndex: 10,
  },
  {
    id: 'pool-platform',
    type: 'poolHeader',
    position: { x: 0, y: PLATFORM_Y },
    data: { label: 'Цифровая платформа', poolType: 'platform' },
    style: { width: POOL_HEADER_WIDTH, height: LANE_HEIGHT },
    draggable: false,
    selectable: false,
    zIndex: 10,
  },
  {
    id: 'pool-buyer',
    type: 'poolHeader',
    position: { x: 0, y: BUYER_Y },
    data: { label: 'Покупатель', poolType: 'buyer' },
    style: { width: POOL_HEADER_WIDTH, height: LANE_HEIGHT },
    draggable: false,
    selectable: false,
    zIndex: 10,
  },

  // ===== ФЕРМЕР (Lane 1) =====
  {
    id: 'start',
    type: 'startEvent',
    position: { x: START_X + 20, y: FARMER_Y + 70 },
    data: { label: 'Начало процесса' },
  },
  {
    id: 'task-form-lot',
    type: 'task',
    position: { x: START_X + 120, y: FARMER_Y + 55 },
    data: { label: 'Формирование лота продукции' },
  },
  {
    id: 'event-paid',
    type: 'intermediateEvent',
    position: { x: START_X + 120 + NODE_SPACING * 4.5, y: FARMER_Y + 70 },
    data: { label: 'Оплачено' },
  },
  {
    id: 'task-prepare',
    type: 'task',
    position: { x: START_X + 120 + NODE_SPACING * 5.2, y: FARMER_Y + 55 },
    data: { label: 'Подготовка и загрузка продукции' },
  },
  {
    id: 'task-ship',
    type: 'task',
    position: { x: START_X + 120 + NODE_SPACING * 6.2, y: FARMER_Y + 55 },
    data: { label: 'Отгрузка продукции покупателю' },
  },
  {
    id: 'end-farmer',
    type: 'endEvent',
    position: { x: START_X + 120 + NODE_SPACING * 7.2, y: FARMER_Y + 70 },
    data: { label: 'Сделка завершена' },
  },

  // ===== ЦИФРОВАЯ ПЛАТФОРМА (Lane 2) =====
  {
    id: 'task-moderate',
    type: 'task',
    position: { x: START_X + 120 + NODE_SPACING * 1, y: PLATFORM_Y + 55 },
    data: { label: 'Модерация и публикация лота' },
  },
  {
    id: 'task-confirm-payment',
    type: 'task',
    position: { x: START_X + 120 + NODE_SPACING * 3.5, y: PLATFORM_Y + 55 },
    data: { label: 'Подтверждение оплаты' },
  },

  // ===== ПОКУПАТЕЛЬ (Lane 3) =====
  {
    id: 'task-view',
    type: 'task',
    position: { x: START_X + 120 + NODE_SPACING * 2, y: BUYER_Y + 55 },
    data: { label: 'Просмотр и выбор лота' },
  },
  {
    id: 'gateway-interested',
    type: 'gateway',
    position: { x: START_X + 120 + NODE_SPACING * 2.9, y: BUYER_Y + 65 },
    data: { label: 'Заинтересован?' },
  },
  {
    id: 'end-not-interested',
    type: 'endEvent',
    position: { x: START_X + 120 + NODE_SPACING * 2.9, y: BUYER_Y + 135 },
    data: { label: 'Не заинтересован' },
  },
  {
    id: 'task-payment',
    type: 'task',
    position: { x: START_X + 120 + NODE_SPACING * 3.8, y: BUYER_Y + 55 },
    data: { label: 'Оплата и смарт-контракт' },
  },

  // ===== ANNOTATIONS =====
  {
    id: 'ann-1',
    type: 'annotation',
    position: { x: START_X + 120, y: FARMER_Y - 30 },
    data: { label: 'Этап 1: Инициация. Лот включает: вид, сорт, объём, цену, условия, фото' },
  },
  {
    id: 'ann-2',
    type: 'annotation',
    position: { x: START_X + 120 + NODE_SPACING * 1, y: PLATFORM_Y - 30 },
    data: { label: 'Этап 2: Проверка данных, верификация документов, публикация' },
  },
  {
    id: 'ann-3',
    type: 'annotation',
    position: { x: START_X + 120 + NODE_SPACING * 2, y: BUYER_Y - 30 },
    data: { label: 'Этап 3: Поиск, сравнение, XOR-решение' },
  },
  {
    id: 'ann-4',
    type: 'annotation',
    position: { x: START_X + 120 + NODE_SPACING * 3.5, y: PLATFORM_Y - 30 },
    data: { label: 'Этап 4: Проверка средств, верификация смарт-контракта' },
  },
  {
    id: 'ann-5',
    type: 'annotation',
    position: { x: START_X + 120 + NODE_SPACING * 5.2, y: FARMER_Y - 30 },
    data: { label: 'Этап 5: Подготовка, упаковка, отгрузка, документы' },
  },
];

// Edge definitions
const arrowMarker = {
  type: MarkerType.ArrowClosed,
  width: 12,
  height: 12,
};

export const edges: Edge[] = [
  // Sequence flow: Start -> Form lot (within Farmer)
  {
    id: 'e1',
    source: 'start',
    target: 'task-form-lot',
    markerEnd: arrowMarker,
    style: { strokeWidth: 1.5, stroke: '#374151' },
  },
  // Message flow: Farmer -> Platform (lot submission)
  {
    id: 'e2',
    source: 'task-form-lot',
    target: 'task-moderate',
    markerEnd: { ...arrowMarker, color: '#6366f1' },
    style: { strokeWidth: 1.5, strokeDasharray: '8 4', stroke: '#6366f1' },
    animated: true,
    label: 'Лот',
    labelStyle: { fill: '#6366f1', fontWeight: 600, fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  },
  // Message flow: Platform -> Buyer (published lot)
  {
    id: 'e3',
    source: 'task-moderate',
    target: 'task-view',
    markerEnd: { ...arrowMarker, color: '#6366f1' },
    style: { strokeWidth: 1.5, strokeDasharray: '8 4', stroke: '#6366f1' },
    animated: true,
    label: 'Каталог',
    labelStyle: { fill: '#6366f1', fontWeight: 600, fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  },
  // Sequence flow: View -> Gateway (within Buyer)
  {
    id: 'e4',
    source: 'task-view',
    target: 'gateway-interested',
    markerEnd: arrowMarker,
    style: { strokeWidth: 1.5, stroke: '#374151' },
  },
  // Gateway -> End (not interested)
  {
    id: 'e5',
    source: 'gateway-interested',
    sourceHandle: 'bottom',
    target: 'end-not-interested',
    markerEnd: { ...arrowMarker, color: '#dc2626' },
    style: { strokeWidth: 1.5, stroke: '#dc2626' },
    label: 'Нет',
    labelStyle: { fill: '#dc2626', fontWeight: 700, fontSize: 11 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  },
  // Gateway -> Payment (interested)
  {
    id: 'e6',
    source: 'gateway-interested',
    sourceHandle: 'right',
    target: 'task-payment',
    markerEnd: { ...arrowMarker, color: '#16a34a' },
    style: { strokeWidth: 1.5, stroke: '#16a34a' },
    label: 'Да',
    labelStyle: { fill: '#16a34a', fontWeight: 700, fontSize: 11 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  },
  // Message flow: Buyer -> Platform (payment)
  {
    id: 'e7',
    source: 'task-payment',
    target: 'task-confirm-payment',
    markerEnd: { ...arrowMarker, color: '#6366f1' },
    style: { strokeWidth: 1.5, strokeDasharray: '8 4', stroke: '#6366f1' },
    animated: true,
    label: 'Оплата',
    labelStyle: { fill: '#6366f1', fontWeight: 600, fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  },
  // Message flow: Platform -> Farmer (payment confirmed)
  {
    id: 'e8',
    source: 'task-confirm-payment',
    target: 'event-paid',
    markerEnd: { ...arrowMarker, color: '#6366f1' },
    style: { strokeWidth: 1.5, strokeDasharray: '8 4', stroke: '#6366f1' },
    animated: true,
    label: 'Подтверждение',
    labelStyle: { fill: '#6366f1', fontWeight: 600, fontSize: 10 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
    labelBgPadding: [4, 2] as [number, number],
  },
  // Sequence flow: Event paid -> Prepare (within Farmer)
  {
    id: 'e9',
    source: 'event-paid',
    target: 'task-prepare',
    markerEnd: arrowMarker,
    style: { strokeWidth: 1.5, stroke: '#374151' },
  },
  // Sequence flow: Prepare -> Ship (within Farmer)
  {
    id: 'e10',
    source: 'task-prepare',
    target: 'task-ship',
    markerEnd: arrowMarker,
    style: { strokeWidth: 1.5, stroke: '#374151' },
  },
  // Sequence flow: Ship -> End (within Farmer)
  {
    id: 'e11',
    source: 'task-ship',
    target: 'end-farmer',
    markerEnd: arrowMarker,
    style: { strokeWidth: 1.5, stroke: '#374151' },
  },
];
