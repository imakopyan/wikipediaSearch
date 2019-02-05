function parseJson([, titles, descriptions, links]) {
    return titles.map((title, i) => ({
      title,
      description: descriptions[i],
      link: links[i],
    }));
  }

  export default parseJson;
  