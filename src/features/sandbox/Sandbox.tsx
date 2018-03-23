import './Sandbox.css';

import { computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import BpmnView from './BpmnView';
import { Link } from '../../sdk/components/Link/Link';
import { Title } from '../../sdk/components/Title/Title';
import { RootStore } from '../../store/root';
import { SandboxModel } from './store/sandbox-model';

export interface IBPMNProps {
  /**
   * Base global state store.
   *
   * Marked optional to satisfy typings, however realistically
   * the root store is injected and will always be available to the component.
   *
   * To get around this, call root store with the (!) operator.
   *
   * @example this.props.root!...
   */
  root?: RootStore;
}

@inject('root')
@observer
export default class Sandbox extends React.Component<IBPMNProps> {
  /**
   * Currently active domain item. This is and example
   * placeholder and may be removed, or refactored.
   */
  @observable private active: SandboxModel | undefined;

  /**
   * Get all items from the sandbox state store
   */
  @computed
  private get models() {
    return this.props.root!.features.sandbox.items;
  }

  public render() {
    return (
      <div>
        <Title title="Sandbox" subTitle="BPMN" />
        <p>Loaded Diagrams: {this.models.length}</p>

        {this.renderPlaceholder()}
        <BpmnView xml={this.active ? this.active.xml : null} />
        {/* ... Insert components here */}
      </div>
    );
  }

  /**
   * Render the simple helper UI to describe how the stack all fits together.
   *
   * Note this may be removed, and is only here for display purposes.
   */
  private renderPlaceholder = () => (
    <>
      {this.models
        .filter(i => !!i.id)
        .map(i => (
          <Link id={i.id} title={i.title} onClick={this.handleOnModelClick} />
        ))}

      {this.active && (
        <>
          <h2>{this.active.title}</h2>
          <textarea name="xml" value={this.active.xml} />
        </>
      )}
    </>
  );

  /**
   * On sandbox title click fetch the individual item from the store
   * as active
   */
  private handleOnModelClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    if (!evt.currentTarget.getAttribute('data-id')) {
      return;
    }

    const id = evt.currentTarget.getAttribute('data-id');

    this.active = this.props.root!.features.sandbox.getItem(id);
  };
}
