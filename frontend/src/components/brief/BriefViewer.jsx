import React from "react";
import EmptyState from "../common/EmptyState";
import BriefActions from "./BriefActions";

// Helper to parse inline bolding **text** -> returns React elements array
function parseInlineStyles(text) {
  if (!text) return "";
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="font-extrabold text-slate-900">{part}</strong>;
    }
    return part;
  });
}

export default function BriefViewer({ brief }) {
  if (!brief) {
    return (
      <EmptyState
        title="No brief yet"
        message="After analysis, the generated research brief will appear in this scrollable panel."
      />
    );
  }

  // Parse markdown lines into structured components
  const lines = brief.split("\n");
  const renderedElements = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (!trimmed) {
      i++;
      continue;
    }
    
    // 1. Headers
    if (trimmed.startsWith("# ")) {
      renderedElements.push(
        <h1 key={i} className="text-lg font-extrabold text-slate-900 mt-6 mb-3 border-b border-slate-100 pb-1.5 tracking-tight">
          {parseInlineStyles(trimmed.slice(2))}
        </h1>
      );
      i++;
    } else if (trimmed.startsWith("## ")) {
      renderedElements.push(
        <h2 key={i} className="text-sm font-bold text-slate-800 mt-5 mb-2.5 tracking-tight">
          {parseInlineStyles(trimmed.slice(3))}
        </h2>
      );
      i++;
    } else if (trimmed.startsWith("### ")) {
      renderedElements.push(
        <h3 key={i} className="text-xs font-bold text-slate-700 mt-4 mb-2 tracking-tight">
          {parseInlineStyles(trimmed.slice(4))}
        </h3>
      );
      i++;
    }
    // 2. Horizontal Rules
    else if (trimmed === "---" || trimmed === "***") {
      renderedElements.push(<hr key={i} className="my-4 border-slate-200" />);
      i++;
    }
    // 3. Tables
    else if (trimmed.startsWith("|")) {
      const headerRows = [];
      const bodyRows = [];
      let isHeader = true;
      
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowText = lines[i].trim();
        // Skip separator line (e.g. | :--- | :--- |)
        if (rowText.includes("---") || rowText.includes(":::")) {
          isHeader = false;
          i++;
          continue;
        }
        
        const cells = rowText.split("|").map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        if (isHeader && headerRows.length === 0) {
          headerRows.push(cells);
        } else {
          bodyRows.push(cells);
        }
        i++;
      }
      
      renderedElements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4 rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold">
              {headerRows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <th key={cIdx} className="px-4 py-2.5 border-b border-slate-200 font-semibold text-slate-900">
                      {parseInlineStyles(cell)}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
              {bodyRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 max-w-[200px] truncate-clip">
                      {parseInlineStyles(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    // 4. Unordered Lists
    else if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("*") || trimmed.startsWith("-")) {
      const listItems = [];
      // Support matching bullet lines that start with * or - followed by a space
      while (i < lines.length) {
        const currentTrim = lines[i].trim();
        if (currentTrim.startsWith("* ") || currentTrim.startsWith("- ")) {
          listItems.push(currentTrim.slice(2).trim());
          i++;
        } else if (currentTrim.startsWith("*") && currentTrim.length > 1) {
          listItems.push(currentTrim.slice(1).trim());
          i++;
        } else if (currentTrim.startsWith("-") && currentTrim.length > 1) {
          listItems.push(currentTrim.slice(1).trim());
          i++;
        } else {
          break;
        }
      }
      renderedElements.push(
        <ul key={`list-${i}`} className="list-disc list-inside pl-2 mb-3.5 space-y-1.5 text-slate-700">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-xs leading-relaxed pl-1">
              {parseInlineStyles(item)}
            </li>
          ))}
        </ul>
      );
    }
    // 5. Paragraphs
    else {
      renderedElements.push(
        <p key={i} className="mb-3 text-xs text-slate-600 leading-relaxed">
          {parseInlineStyles(trimmed)}
        </p>
      );
      i++;
    }
  }

  return (
    <div className="space-y-4">
      <BriefActions brief={brief} />
      <div className="brief-markdown max-h-[520px] overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-inner">
        {renderedElements}
      </div>
    </div>
  );
}
