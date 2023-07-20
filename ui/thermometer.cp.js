import { ShadowObject, ViewModel, component } from 'lively.morphic';
import { pt, rect } from 'lively.graphics/geometry-2d.js';
import { Color, LinearGradient, RadialGradient } from 'lively.graphics/color.js';
import { Ellipse } from 'lively.morphic/morph.js';
import { signal } from 'lively.bindings';
import { num } from 'lively.lang';

class ThermometerModel extends ViewModel {
  static get properties () {
    return {
      max: { defaultValue: 100 },
      min: { defaultValue: 0 },
      number: {
        defaultValue: 50,
        set (v) {
          this.setProperty('number', v);
          signal(this.view, 'number', v);
          signal(this.view, 'numberChanged', v);
        }
      },
      bindings: {
        get () {
          return [
            { target: 'meter', signal: 'onDrag', override: true, handler: 'dragNumber' },
            { target: 'meter', signal: 'onDragStart', handler: 'startNumberDragging' }
          ];
        }
      }
    };
  }

  startNumberDragging () {
    this._startValue = this.number;
  }

  viewDidLoad () {
    this.onRefresh('number');
  }

  onRefresh (prop) {
    if (prop === 'number') {
      this.ui.gauge.height = num.interpolate(this.number / (this.max - this.min), 0, this.ui.meter.height);
    }
  }

  dragNumber ($super, evt) {
    const offset = evt.state.dragStartPosition.subPt(evt.state.lastDragPosition).y / 2;
    this.number = num.clamp(this._startValue + offset, this.min, this.max);
  }
}

const Thermometer = component({
  type: Ellipse,
  defaultViewModel: ThermometerModel,
  extent: pt(75.4, 75.3),
  fill: new RadialGradient({ stops: [{ offset: 0.8353657561412481, color: Color.white }, { offset: 1, color: Color.rgb(189, 189, 189) }], bounds: rect(0, 0, 75.359375, 75.34765625), focus: pt(0.5, 0.5) }),
  isEllipse: true,
  position: pt(645.2, 726.8),
  submorphs: [{
    name: 'shaft',
    borderRadius: {
      bottomLeft: 0,
      bottomRight: 0,
      topLeft: 20,
      topRight: 20
    },
    extent: pt(44.8, 199.1),
    fill: new LinearGradient({ stops: [{ offset: 0, color: Color.rgb(189, 189, 189) }, { offset: 0.13560724795291712, color: Color.white }, { offset: 0.8353657561412481, color: Color.white }, { offset: 1, color: Color.rgb(189, 189, 189) }], vector: rect(0.9999941023206964, 0.5024285066442088, -0.9999882046413928, -0.004857013288417674) }),
    position: pt(15.7, -189.5),
    submorphs: [{
      name: 'meter',
      draggable: true,
      borderRadius: {
        bottomLeft: 0,
        bottomRight: 0,
        topLeft: 10,
        topRight: 10
      },
      clipMode: 'hidden',
      dropShadow: new ShadowObject({ color: Color.black, inset: true, blur: 15 }),
      extent: pt(14.2, 213),
      fill: Color.rgb(113, 113, 113),
      position: pt(15.5, 16.1),
      submorphs: [{
        name: 'gauge',
        clipMode: 'hidden',
        reactsToPointer: false,
        extent: pt(16, 224),
        fill: new LinearGradient({ stops: [{ offset: 0, color: Color.rgb(249, 112, 102) }, { offset: 0.9928831883316274, color: Color.rgb(244, 67, 54) }], vector: rect(0.49443808270431705, 0.9999690641189672, 0.011123834591365905, -0.9999381282379345) }),
        position: pt(15.2, 201.9),
        rotation: -3.141592653589793
      }]
    }]
  }, {
    type: Ellipse,
    name: 'anEllipse',
    dropShadow: new ShadowObject({ distance: 0, rotation: 0, color: Color.rgba(244, 67, 54, 0.45), blur: 15 }),
    extent: pt(35, 35),
    fill: new RadialGradient({ stops: [{ offset: 0, color: Color.rgb(249, 112, 102) }, { offset: 1, color: Color.rgb(244, 67, 54) }], bounds: rect(0, 0, 35, 35), focus: pt(0.5, 0.5) }),
    isEllipse: true,
    position: pt(20.4, 20)
  }]
});

export { Thermometer };
