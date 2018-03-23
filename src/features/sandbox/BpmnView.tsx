import * as React from 'react';
import BpmnViewer from 'bpmn-js';

class BpmnView extends React.Component<{xml: any}, {}> {
  [x: string]: any;

  generateXML(xml: any, Viewer: any) {
    if (!xml) {return};
    Viewer.importXML(xml, (err: any) => {
      let canvas = Viewer.get('canvas');
      canvas.zoom('fit-viewport');
    });
  }

  componentDidMount() {
    this.viewer = new BpmnViewer({ container: '#canvas' });
    this.generateXML(this.props.xml, this.viewer);
  }

  componentWillReceiveProps(nextProps: any) {
    this.generateXML(nextProps.xml, this.viewer);
  }

  render() {
    return <div id="canvas" style={{ height: 600, width: 1000 }} />;
  }
}
export default BpmnView;
