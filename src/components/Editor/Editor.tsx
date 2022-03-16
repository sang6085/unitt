import React from "react";

import { Editor } from "@tinymce/tinymce-react";

interface IEditor {
  value: string;
  handleChangeValue: (content: any, editor: any) => void;
}

const EditorComponent = (props: IEditor) => {
  // const [content, setContent] = React.useState<string>(props.value);

  // const handleChange = (content: any, editor: any) => {
  //   setContent(content);
  // };

  const uploadImage = (editor: any) => {
    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon");
    fileInput.addEventListener("change", () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          editor.insertContent('<img src="' + e.target.result + '">');
          fileInput.value = "";
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    });
    fileInput.click();
  };

  return (
    <Editor
      apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
      value={props.value}
      init={{ 
        height: 400,
        menubar: false,
        plugins: "example | image code",
        toolbar:
          "code | example undo redo | styleselect | fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | uploadImage| emailTemplate ",
        paste_data_images: true,

        setup: (editor: any) => {
          editor.ui.registry.addButton("uploadImage", {
            text: "",
            icon: "image",
            onAction: () => uploadImage(editor),
          });
          editor.ui.registry.addMenuButton("emailTemplate", {
            text: "Email Template",
            fetch: function (callback: any) {
              var items = [
                {
                  type: "menuitem",
                  text: "{{ product }}",
                  onAction: function () {
                    editor.insertContent("&nbsp;{{ product }}");
                  },
                },
                {
                  type: "menuitem",
                  text: "{{ user }}",
                  onAction: function () {
                    editor.insertContent("&nbsp;{{ user }}");
                  },
                },
                {
                  type: "menuitem",
                  text: "{{ name }}",
                  onAction: function () {
                    editor.insertContent("&nbsp;{{ name }}");
                  },
                },
              ];
              callback(items);
            },
          });
        },
      }}
      onEditorChange={props.handleChangeValue}
    />
  );
};

export default EditorComponent;
