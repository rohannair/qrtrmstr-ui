import React from 'react';
import styles from './slideEquipmentBody.css';

import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

const SlideEquipmentBody = ({ opt, newOption, editOption, deleteOption }) => {
  const onClick = () => newOption(opt.id);
  const onRemove = (key) => deleteOption(opt.id, key);

  const options = opt.opts.map((val, i) => {
    return (
      <tr key={val}>
        <td>
          <input name="opts" onChange={e => editOption(e.target.name, e.target.value, i) } value={val} />
        </td>
        <td>
          <input name="optNames" onChange={e => editOption(e.target.name, e.target.value, i) } value={ opt.optNames[i] }/>
        </td>
        <td className="removeButton">
          <Button classes="transparent sm" onClick={ onRemove.bind(this, val) }>&times;</Button>
        </td>
      </tr>
    );
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
        <Button classes="primary md" onClick={ onClick }>+</Button>
      </div>
    </div>
  );

};

export default SlideEquipmentBody;
