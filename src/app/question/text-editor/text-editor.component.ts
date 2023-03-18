import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';


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
  @Input() index:number=1;

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

  froalaOption1=this.froalaOptions( 'Question Text');
  froalaOption2=this.froalaOptions( 'Answer Text');
  froalaOption3=this.froalaOptions('Message for those who choose this');
  froalaOption4=this.froalaOptions('options');

  froalaOptions(placeholder:string){
    if(placeholder == 'options'){
      placeholder ='option '+this.index;
    }
    return {
      placeholderText:placeholder,
      toolbarInline: true,
      charCounterCount: false,
      toolbarVisibleWithoutSelection: false,
      toolbarButtons: [
        'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
        'fontFamily', 'fontSize', 'color', 'paragraphFormat',
        'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink',
        'insertImage',  'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting',
        'selectAll', 'html', 'help', 'specialCharacters', 'codeView'
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
