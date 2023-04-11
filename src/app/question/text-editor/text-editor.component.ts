import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/entities.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/quick_insert.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  form!:FormGroup;
  EditorValue:string='';

  @Output() editorValue = new EventEmitter<string>();
  @Input() placeholder!:string;
  @Input() index!:number;
  @Input()commentValue!:string;

  constructor(){

  }
  onEditorValueChange(newValue: string) {
    this.EditorValue = newValue;
    this.editorValue.emit(this.EditorValue);
  }


  autoResize(textarea: any) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  ngOnInit(): void {
  }

  froalaOptions(placeholder:string){
    if(placeholder == 'options'){
      placeholder ='option '+(this.index+1);
    }
    return {
      placeholderText:placeholder,
      toolbarInline: true,
      charCounterCount: false,
      toolbarVisibleWithoutSelection: false,
      toolbarButtons: [
        'bold', 'italic', 'underline', 'subscript', 'superscript',
        'fontFamily', 'fontSize', 'color', 'paragraphFormat',
        'align', 'formatOL', 'formatUL',  'insertLink',
        'insertImage',  'insertFile', 'insertTable', 'undo', 'redo',
        'help', 'specialCharacters', 'codeView'
      ],
      heightMin: 40,
      imageUpload: true,
      imagePaste: true,
      fileUpload: true,
      videoUpload: true,
      videoResponsive: true,
      videoMaxSize: 1024 * 1024 * 50,
      imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg+xml'],
      fileAllowedTypes: ['*'],
      videoAllowedTypes: ['mp4', 'webm', 'ogg'],
      spellcheck: true,
      tableResizer: true,
      codeMirror: true,
      codeMirrorOptions: {
        theme: 'monokai',
        mode: 'htmlmixed'
      },
      emoticonsUseImage: true,
      emoticonsStep: 4,
      emoticonsSet: {
        "people": [
          {"code": "1F600", "icon": "😀", "title": "Grinning face"},
          {"code": "1F601", "icon": "😁", "title": "Grinning face with smiling eyes"},
          {"code": "1F602", "icon": "😂", "title": "Face with tears of joy"}
        ]
      },
      pluginsEnabled: [
        'align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons',
        'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'help', 'image', 'inlineStyle',
        'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert',
        'quote', 'save', 'specialCharacters', 'table', 'url', 'video', 'wordPaste'
      ],
      specialCharactersSets: [{
        title: 'Latin',
        list: [
          { 'char': '&iexcl;', desc: 'INVERTED EXCLAMATION MARK' },
          { 'char': '&cent;', desc: 'CENT SIGN' },
          { 'char': '&pound;', desc: 'POUND SIGN' },
          { 'char': '&curren;', desc: 'CURRENCY SIGN' },
          { 'char': '&yen;', desc: 'YEN SIGN' },
          { 'char': '&brvbar;', desc: 'BROKEN BAR' },
          { 'char': '&sect;', desc: 'SECTION SIGN' },
          { 'char': '&uml;', desc: 'DIAERESIS' },
          { 'char': '&copy;', desc: 'COPYRIGHT SIGN' },
          { 'char': '&trade;', desc: 'TRADEMARK SIGN' },
          { 'char': '&ordf;', desc: 'FEMININE ORDINAL INDICATOR' },
          { 'char': '&laquo;', desc: 'LEFT-POINTING DOUBLE ANGLE QUOTATION MARK' },
          { 'char': '&not;', desc: 'NOT SIGN' },
          { 'char': '&reg;', desc: 'REGISTERED SIGN' },
          { 'char': '&macr;', desc: 'MACRON' },
          { 'char': '&deg;', desc: 'DEGREE SIGN' },
          { 'char': '&plusmn;', desc: 'PLUS-MINUS SIGN' },
          { 'char': '&sup2;', desc: 'SUPERSCRIPT TWO' },
          { 'char': '&sup3;', desc: 'SUPERSCRIPT THREE' },
          { 'char': '&acute;', desc: 'ACUTE ACCENT' },
          { 'char': '&micro;', desc: 'MICRO SIGN' },
          { 'char': '&para;', desc: 'PILCROW SIGN' },
          { 'char': '&middot;', desc: 'MIDDLE DOT' },
        ]
      },
      {
        title: 'Greek',
        list: [
          { 'char': '&Alpha;', desc: 'GREEK CAPITAL LETTER ALPHA' },
          { 'char': '&Beta;', desc: 'GREEK CAPITAL LETTER BETA' },
          { 'char': '&Gamma;', desc: 'GREEK CAPITAL LETTER GAMMA' },
          { 'char': '&Delta;', desc: 'GREEK CAPITAL LETTER DELTA' },
          { 'char': '&Epsilon;', desc: 'GREEK CAPITAL LETTER EPSILON' },
          { 'char': '&Zeta;', desc: 'GREEK CAPITAL LETTER ZETA' },
          { 'char': '&Eta;', desc: 'GREEK CAPITAL LETTER ETA' },
          { 'char': '&Theta;', desc: 'GREEK CAPITAL LETTER THETA' },
          { 'char': '&Iota;', desc: 'GREEK CAPITAL LETTER IOTA' },
          { 'char': '&Kappa;', desc: 'GREEK CAPITAL LETTER KAPPA' }
        ]
      }]
    };


  }

}
