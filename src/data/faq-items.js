import React from "react";
import Link from "next/link";
import { organizationConfig } from "@/config/organization-config";

// Fonction pour transformer le texte en JSX avec formatage approprié
const processAnswer = (faqItem) => {
  if (!faqItem.answer) return null;
  
  // Diviser le texte en paragraphes
  const paragraphs = faqItem.answer.split("\n\n");
  
  // Fonction pour mettre en évidence des termes
  const emphasize = (text, termsToEmphasize) => {
    if (!termsToEmphasize || !termsToEmphasize.length) return text;
    
    // Parcourir chaque terme à mettre en évidence
    let result = text;
    termsToEmphasize.forEach(term => {
      result = result.replace(
        new RegExp(term, 'g'), 
        `<strong>${term}</strong>`
      );
    });
    
    return result;
  };

  // Transformer les paragraphes en JSX
  const processedParagraphs = paragraphs.map((para, index) => {
    // Vérifier s'il s'agit d'une liste à puces
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
    
    // Paragraphe standard
    return (
      <p key={index} dangerouslySetInnerHTML={{ 
        __html: emphasize(para, faqItem.emphasize) 
      }} />
    );
  });

  // Ajouter des liens s'ils existent
  if (faqItem.links && faqItem.links.length) {
    const firstPara = processedParagraphs[0];
    
    // Créer un nouveau paragraphe avec des liens
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
    
    // Remplacer le premier paragraphe
    processedParagraphs[0] = paraWithLinks;
  }

  // Retourner un fragment avec tous les paragraphes
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

// Transformer la configuration en éléments FAQ utilisables
export const FAQ_ITEMS = organizationConfig.faq.map(item => ({
  question: item.question,
  answer: processAnswer(item)
}));
