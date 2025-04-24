import React from "react";
import Link from "next/link";
import { organizationConfig } from "@/config/organization-config";

// Function to transform text into JSX with appropriate formatting
const processAnswer = (faqItem) => {
  if (!faqItem.answer) return null;
  
  // Split text into paragraphs
  const paragraphs = faqItem.answer.split("\n\n");
  
  // Function to highlight terms
  const emphasize = (text, termsToEmphasize) => {
    if (!termsToEmphasize || !termsToEmphasize.length) return text;
    
    // Process each term to highlight
    let result = text;
    termsToEmphasize.forEach(term => {
      result = result.replace(
        new RegExp(term, 'g'), 
        `<strong>${term}</strong>`
      );
    });
    
    return result;
  };

  // Transform paragraphs into JSX
  const processedParagraphs = paragraphs.map((para, index) => {
    // Check if it's a bullet list
    if (para.startsWith('- ')) {
      const listItems = para.split('\n- ').map(item => item.replace(/^- /, ''));
      return (
        <ul key={index}>
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ 
              __html: emphasize(item, faqItem.emphasize) 
            }} />
          ))}
        </ul>
      );
    }
    
    // Standard paragraph
    return (
      <p key={index} dangerouslySetInnerHTML={{ 
        __html: emphasize(para, faqItem.emphasize) 
      }} />
    );
  });

  // Add links if they exist
  if (faqItem.links && faqItem.links.length) {
    const firstPara = processedParagraphs[0];
    
    // Create a new paragraph with links
    const paraWithLinks = (
      <p key="linked-para">
        {firstPara.props.dangerouslySetInnerHTML.__html}
        {faqItem.links.map((link, idx) => (
          <span key={idx}>
            {" "}
            <Link href={link.url} target="_blank">
              {link.text}
            </Link>
            {idx < faqItem.links.length - 1 ? ", " : " "}
          </span>
        ))}
      </p>
    );
    
    // Replace the first paragraph
    processedParagraphs[0] = paraWithLinks;
  }

  // Return a fragment with all paragraphs
  return (
    <>
      {processedParagraphs.map((para, idx) => (
        <React.Fragment key={`frag-${idx}`}>
          {para}
          {idx < processedParagraphs.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};

// Transform the configuration into usable FAQ items
export const FAQ_ITEMS = organizationConfig.faq.map(item => ({
  question: item.question,
  answer: processAnswer(item)
}));
