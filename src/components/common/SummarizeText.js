import React from "react";

function SummarizeText(text, maxLength = 100) {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? truncated.slice(0, lastSpaceIndex) + "..."
    : truncated + "...";
}

export default SummarizeText;
