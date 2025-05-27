// src/components/Metrics.tsx
import React from 'react'
import type { Metrics as MetricsType } from '../api/products'

export interface MetricsProps {
  metrics: MetricsType
}

const Metrics: React.FC<MetricsProps> = ({ metrics }) => {
  const { totalStock, totalValue, avgPrice, byCategory } = metrics
  return (
    <div className="bg-white p-4 rounded shadow mb-4 overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Category</th>
            <th className="p-2">Total in Stock</th>
            <th className="p-2">Total Value</th>
            <th className="p-2">Avg Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(byCategory).map(([cat, m]) => (
            <tr key={cat} className="border-b">
              <td className="p-2 font-medium">{cat}</td>
              <td className="p-2">{m.totalStock}</td>
              <td className="p-2">${m.totalValue.toFixed(2)}</td>
              <td className="p-2">${m.avgPrice.toFixed(2)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="p-2">Overall</td>
            <td className="p-2">{totalStock}</td>
            <td className="p-2">${totalValue.toFixed(2)}</td>
            <td className="p-2">${avgPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Metrics
