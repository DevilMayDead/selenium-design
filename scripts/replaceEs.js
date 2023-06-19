function replacePath(path) {
  if (path.node.source && path.node.source.value?.includes('es/')) {
    const esModule = path.node.source.value.replace('/es/', '/lib/');
    try {
      if (require.resolve(esModule)) {
        path.node.source.value = esModule;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function replaceEs() {
  return {
    visitor: {
      ImportDeclaration: replacePath,
      ExportNamedDeclaration: replacePath,
    },
  };
}

module.exports = replaceEs;
