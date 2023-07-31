import { TilingLayout, add, ViewModel, component, ShadowObject, part } from 'lively.morphic';
import { pt } from 'lively.graphics/geometry-2d.js';
import { Color } from 'lively.graphics/color.js';
import { Text } from 'lively.morphic/text/morph.js';
import { DefaultNumberWidget } from 'lively.ide/value-widgets.cp.js';
import { Thermometer } from 'LivelyKernel--partsbin/ui/thermometer.cp.js';

export class TemperatureConverterModel extends ViewModel {
  static get properties () {
    return {
      celsius: {
        defaultValue: 0,
        set (c) {
          this.setProperty('celsius', c);
          this.setProperty('fahrenheit', c * (9 / 5) + 32);
        }
      },
      fahrenheit: {
        defaultValue: 32,
        set (f) {
          this.setProperty('fahrenheit', f);
          this.setProperty('celsius', (f - 32) * (5 / 9));
        }
      },
      bindings: {
        get () {
          return [
            { target: 'celsius input', signal: 'number', handler: 'setCelsius' },
            { target: 'fahrenheit input', signal: 'number', handler: 'setFahrenheit' }
          ];
        }
      }
    };
  }

  setCelsius (c) {
    this.celsius = c;
    this.fahrenheit = c * (9 / 5) + 32;
  }

  setFahrenheit (f) {
    this.fahrenheit = f;
    this.celsius = (f - 32) * (5 / 9);
  }

  onRefresh (prop) {
    this.withoutBindingsDo(() => {
      if (prop === 'celsius') { this.ui.celsiusInput.number = this.celsius; }
      if (prop === 'fahrenheit') { this.ui.fahrenheitInput.number = this.fahrenheit; }
    });
  }
}

const BaseForm = component({
  borderColor: Color.rgb(214, 214, 214),
  borderRadius: 18,
  borderWidth: 5,
  dropShadow: new ShadowObject({ color: Color.rgba(0, 0, 0, 0.57), blur: 29 }),
  extent: pt(466, 217.3),
  position: pt(282.9, 312),
  submorphs: [{
    type: Text,
    name: 'celsius label',
    dynamicCursorColoring: true,
    fill: Color.white,
    fontSize: 19,
    position: pt(66.6, 43.5),
    textAndAttributes: ['Celsius', null]
  }, {
    type: Text,
    name: 'fahrenheit label',
    dynamicCursorColoring: true,
    fill: Color.white,
    fontSize: 20,
    position: pt(315.5, 41.3),
    textAndAttributes: ['Fahrenheit', null]
  }, {
    type: Text,
    name: 'equals sign',
    dynamicCursorColoring: true,
    fill: Color.white,
    fontSize: 34,
    position: pt(221.3, 83.4),
    textAndAttributes: ['=', {
      fontFamily: '"Font Awesome 6 Free", "Font Awesome 6 Brands"',
      fontWeight: '900'
    }]
  }]
});

const TemperatureConverter = component(BaseForm, {
  defaultViewModel: TemperatureConverterModel,
  submorphs: [
    add(part(DefaultNumberWidget, {
      name: 'celsius input',
      position: pt(63.7, 95.1),
      submorphs: [{
        name: 'button holder',
        layout: new TilingLayout({
          axis: 'column',
          orderByIndex: true
        })
      }]
    })), add(part(DefaultNumberWidget, {
      name: 'fahrenheit input',
      position: pt(330.6, 95.5),
      submorphs: [{
        name: 'button holder',
        layout: new TilingLayout({
          axis: 'column',
          orderByIndex: true
        })
      }]
    }))]
});

export const ThermometerConverter = component(BaseForm, {
  defaultViewModel: TemperatureConverterModel,
  extent: pt(466, 236.2),
  submorphs: [add(part(Thermometer, {
    name: 'celsius input',
    viewModel: {
      min: -50,
      max: 200
    },
    scale: 0.5,
    position: pt(77.7, 168)
  })), add(part(Thermometer, {
    name: 'fahrenheit input',
    viewModel: {
      min: -50,
      max: 200
    },
    scale: 0.5,
    position: pt(344.7, 167.1)
  }))]
});

export { TemperatureConverter };
