import React from 'react';
import withFormActions from '../../hoc/withFormActions';
import ImportShapePlaceholderWizard, { EDIT_IMPORTSHAPEPLACEHOLDER_FORM } from '../../components/import/ImportShapePlaceholderWizard';

class ImportShapePlaceholder extends React.PureComponent {
  componentDidMount() {
    document.title = 'vidi.js | Import | Shape Placeholder';
  }

  componentWillUnmount() {
    const { destroyForm } = this.props;
    destroyForm(EDIT_IMPORTSHAPEPLACEHOLDER_FORM);
  }

  render() {
    return (
      <ImportShapePlaceholderWizard />
    );
  }
}

export default withFormActions(ImportShapePlaceholder);
