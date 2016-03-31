import React from 'react';
import styles from './slideEquipmentBody.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const SlideEquipmentBody = ({ opt, newOption, deleteOption }) => {
  const onClick = () => newOption(opt[0].id);
  const onRemove = (key) => deleteOption(opt[0].id, key);
  const onSave = () => console.log('Saved!');

  const options = opt[0].opts.map((val, i) => {
    return (
      <tr key={val}>
        <td>
          <input defaultValue={val} />
        </td>
        <td>
          <input defaultValue={ opt[0].optNames[i] }/>
        </td>
        <td className="removeButton">
          <Button classes="transparent sm" onClick={ onRemove.bind(this, val) }>&times;</Button>
        </td>
      </tr>
    )
  });


  return (
    <div className="slideEquipmentBody">
      <table>
        <thead>
          <tr><th>ID</th><th>Label</th><th></th></tr>
        </thead>
        <tbody>
          { options }
        </tbody>
      </table>
      <div className="buttonRow">
        <ButtonGroup>
          <Button classes="inverse md" onClick={ onSave }>Save</Button>
          <Button classes="primary md" onClick={ onClick }>+</Button>
        </ButtonGroup>
      </div>
    </div>
  );

}

export default SlideEquipmentBody;
