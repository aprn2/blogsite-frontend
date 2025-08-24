import { useState, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

export default function RTBody({ html }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    { type: 'heading-one', children: [{ text: 'hello' }] },
  ]);

  return (
    <div className="p-3">
      <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
        <Editable placeholder="Type here..." />
      </Slate>
    </div>
  );
}
