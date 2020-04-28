import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Directive, OnInit } from '@angular/core';


@Directive({
  selector: '[rangeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RangeValidatorDirective, multi: true }
  ]
})
export class RangeValidatorDirective implements Validator, OnInit {

  ngOnInit() {}

  validate(c: FormControl) {
    const v: number = c.value;
    if ((v < 0) || (v > 100)) {
      return { range: true};
    }
    return null;
  }
}
