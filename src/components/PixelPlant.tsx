import React from 'react';

interface PixelPlantProps {
  variant?: 'vine' | 'ivy' | 'pothos' | 'fern';
  className?: string;
}

export const PixelPlant: React.FC<PixelPlantProps> = ({ variant = 'vine', className = '' }) => {
  const uniqueLeaf = (x: number, y: number, rotation: number, fill: string, flip: boolean = false) => {
    // This new path draws the leaf starting from a point and extending downwards
    // The control points are adjusted to create a drooping, downward-facing shape
    const d = `M ${x} ${y}
               c -5,25 -20,45 -5,65
               c 15,20 35,10 40,-10
               c 5,-20 -5,-35 -15,-50
               c -10,-10 -15,-15 -20,-5 z`;
    
    // The transform now correctly rotates and flips the leaf
    const transform = `rotate(${rotation}, ${x}, ${y}) scale(${flip ? '-1' : '1'}, 1)`;

    return (
      <path
        d={d}
        fill={fill}
        transform={transform}
      />
    );
  };

  const renderPlant = (stemPath: string, leaves: JSX.Element[]) => (
    <svg viewBox="0 0 220 800" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" fill="none">
        {/* Stem */}
        <path
          d={stemPath}
          stroke="#3B5323"
          strokeWidth="6"
          fill="none"
        />

        {/* Leaves */}
        {leaves}
      </g>
    </svg>
  );

  switch (variant) {
    case 'vine':
      return renderPlant(
        "M110 0 C 95 110, 115 190, 90 260 C 120 340, 80 420, 100 780",
        [
          uniqueLeaf(90, 70, 25, '#2E8B57'),
          uniqueLeaf(115, 170, -25, '#3CB371', true),
          uniqueLeaf(85, 270, 30, '#2E8B57'),
          uniqueLeaf(110, 380, -15, '#228B22', true),
          uniqueLeaf(95, 510, 10, '#006400'),
          uniqueLeaf(105, 640, -20, '#556B2F', true),
          uniqueLeaf(100, 720, 5, '#3B5323')
        ]
      );

    case 'ivy':
      return renderPlant(
        "M110 0 C 120 90, 100 160, 130 230 C 110 300, 140 470, 110 780",
        [
          uniqueLeaf(120, 80, -35, '#3CB371', true),
          uniqueLeaf(105, 160, 15, '#2E8B57'),
          uniqueLeaf(135, 240, -45, '#228B22', true),
          uniqueLeaf(115, 350, 25, '#6B8E23'),
          uniqueLeaf(130, 470, -10, '#556B2F', true),
          uniqueLeaf(120, 620, 35, '#2E8B57')
        ]
      );

    case 'pothos':
      return renderPlant(
        "M110 0 C 105 120, 115 200, 95 270 C 110 390, 100 520, 120 780",
        [
          uniqueLeaf(100, 90, 10, '#228B22'),
          uniqueLeaf(120, 180, -30, '#32CD32', true),
          uniqueLeaf(90, 270, 20, '#006400'),
          uniqueLeaf(110, 380, -5, '#3CB371', true),
          uniqueLeaf(95, 500, 25, '#2E8B57'),
          uniqueLeaf(105, 640, -15, '#6B8E23', true)
        ]
      );

    case 'fern':
      return renderPlant(
        "M110 0 C 90 110, 130 180, 100 250 C 120 360, 90 490, 110 780",
        [
          uniqueLeaf(95, 80, 45, '#3CB371'),
          uniqueLeaf(125, 160, -45, '#006400', true),
          uniqueLeaf(100, 250, 15, '#556B2F'),
          uniqueLeaf(120, 370, -25, '#2E8B57', true),
          uniqueLeaf(95, 500, 30, '#6B8E23'),
          uniqueLeaf(110, 640, -10, '#3B5323', true)
        ]
      );

    default:
      return null;
  }
};