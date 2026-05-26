import { useCallback } from 'react';
import { useBedStore } from '../../store/useBedStore';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function DirectionPad() {
  const moveUp = useBedStore(s => s.moveUp);
  const moveDown = useBedStore(s => s.moveDown);
  const stopMovement = useBedStore(s => s.stopMovement);
  const movingDirection = useBedStore(s => s.movingDirection);

  const startMove = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up') moveUp();
    else moveDown();
  }, [moveUp, moveDown]);

  const stopMove = useCallback(() => {
    stopMovement();
  }, [stopMovement]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-text mb-3 text-center">方向控制</h3>
      <div className="flex flex-col items-center gap-2">
        <button
          onPointerDown={() => startMove('up')}
          onPointerUp={stopMove}
          onPointerLeave={stopMove}
          className={`w-full max-w-[200px] h-14 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 ${
            movingDirection === 'up'
              ? 'bg-primary text-white shadow-lg scale-95'
              : 'bg-primary-light text-primary hover:bg-blue-200 active:scale-95'
          }`}
        >
          <ChevronUp size={24} />
          <span className="text-base font-semibold">上升</span>
        </button>

        <div className="text-sm text-text-secondary font-medium py-1">
          {movingDirection === 'up' ? '▲ 上升中...' : movingDirection === 'down' ? '▼ 下降中...' : '已停止'}
        </div>

        <button
          onPointerDown={() => startMove('down')}
          onPointerUp={stopMove}
          onPointerLeave={stopMove}
          className={`w-full max-w-[200px] h-14 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 ${
            movingDirection === 'down'
              ? 'bg-primary text-white shadow-lg scale-95'
              : 'bg-primary-light text-primary hover:bg-blue-200 active:scale-95'
          }`}
        >
          <ChevronDown size={24} />
          <span className="text-base font-semibold">下降</span>
        </button>
      </div>
    </div>
  );
}
