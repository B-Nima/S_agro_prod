import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

// Start Event - тонкий круг
export function StartEventNode({ data }: NodeProps) {
  const label = String(data.label || '');
  return (
    <div className="flex items-center justify-center relative">
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="w-10 h-10 rounded-full border-2 border-green-600 bg-white flex items-center justify-center shadow-sm">
        <div className="w-3 h-3 rounded-full bg-green-600" />
      </div>
      {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

// End Event - толстый круг
export function EndEventNode({ data }: NodeProps) {
  const label = String(data.label || '');
  return (
    <div className="flex items-center justify-center relative">
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="w-10 h-10 rounded-full border-4 border-red-600 bg-white flex items-center justify-center shadow-sm">
        <div className="w-4 h-4 rounded-full bg-red-600" />
      </div>
      {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

// Intermediate Event - двойной круг
export function IntermediateEventNode({ data }: NodeProps) {
  const label = String(data.label || '');
  return (
    <div className="flex items-center justify-center relative">
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="w-10 h-10 rounded-full border-2 border-yellow-600 bg-white flex items-center justify-center shadow-sm">
        <div className="w-7 h-7 rounded-full border-2 border-yellow-600 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
      </div>
      {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

// Task - прямоугольник со скруглёнными углами
export function TaskNode({ data }: NodeProps) {
  const label = String(data.label || '');
  return (
    <div className="flex items-center justify-center">
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="px-4 py-3 rounded-lg border-2 border-blue-500 bg-blue-50 min-w-[140px] text-center shadow-sm hover:shadow-md transition-shadow">
        <div className="text-xs font-semibold text-blue-800 leading-tight">
          {label}
        </div>
      </div>
    </div>
  );
}

// XOR Gateway - ромб
export function GatewayNode({ data }: NodeProps) {
  const label = String(data.label || '');
  return (
    <div className="flex items-center justify-center relative">
      <Handle type="target" position={Position.Left} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Right} className="!bg-transparent !border-0 !w-0 !h-0" id="right" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" id="bottom" />
      <div className="w-12 h-12 rotate-45 border-2 border-orange-500 bg-orange-50 flex items-center justify-center shadow-sm">
        <span className="-rotate-45 text-lg font-bold text-orange-600">✕</span>
      </div>
      {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-600 whitespace-nowrap font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

// Pool Header
export function PoolHeaderNode({ data }: NodeProps) {
  const label = String(data.label || '');
  const poolType = String(data.poolType || '');
  const colorMap: Record<string, string> = {
    farmer: 'bg-emerald-600',
    platform: 'bg-indigo-600',
    buyer: 'bg-amber-600',
  };
  const bgColor = colorMap[poolType] || 'bg-gray-600';
  
  return (
    <div className={`w-full h-full ${bgColor} rounded-l-lg flex items-center justify-center shadow-sm`}>
      <span className="text-white font-bold text-xs text-center leading-tight" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
        {label}
      </span>
    </div>
  );
}

// Annotation node
export function AnnotationNode({ data }: NodeProps) {
  const label = String(data.label || '');
  return (
    <div className="max-w-[160px]">
      <div className="text-[10px] text-gray-500 italic bg-yellow-50 border border-yellow-200 rounded px-2 py-1 leading-tight">
        {label}
      </div>
    </div>
  );
}

// Lane Background
export function LaneBackgroundNode({ data }: NodeProps) {
  const color = String(data.color || 'green');
  const label = String(data.label || '');
  
  const bgColors: Record<string, string> = {
    green: 'bg-emerald-50/50 border-emerald-200/60',
    indigo: 'bg-indigo-50/50 border-indigo-200/60',
    amber: 'bg-amber-50/50 border-amber-200/60',
  };
  const textColors: Record<string, string> = {
    green: 'text-emerald-600',
    indigo: 'text-indigo-600',
    amber: 'text-amber-600',
  };
  
  return (
    <div className={`w-full h-full rounded-r-lg border ${bgColors[color]} flex items-start p-2`}>
      <span className={`text-[10px] font-medium ${textColors[color]} opacity-50 uppercase tracking-wide`}>
        {label}
      </span>
    </div>
  );
}
