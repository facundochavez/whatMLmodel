import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';

const MyCodeMirror = ({ ...props }) => {
  return (
    <div className="w-full flex p-4 bg-code-mirror-bg rounded-lg">
      <CodeMirror
        {...props}
        extensions={[python()]}
        theme={dracula}
        editable={false}
        unselectable="on"
        style={{ backgroundColor: 'transparent' }}
        basicSetup={{
          foldGutter: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
        className={props.className + ' w-full'}
      />
    </div>
  );
};

export default MyCodeMirror;
