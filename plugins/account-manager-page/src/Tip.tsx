import React from 'react'

interface TipProps {
  config?: Partial<{ assetId: string }>
}

const Tip: React.FC<TipProps> = () => {
  return (
    <div>
      缺少 assetId
    </div>
  )
}

export default Tip