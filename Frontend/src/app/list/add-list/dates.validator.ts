import { FormGroup } from '@angular/forms';

export function compareDates(from: string, to: string) {

 return (formGroup: FormGroup) => {
    const startDate = formGroup.controls[from];
    const endDate = formGroup.controls[to];
    if (new Date(startDate as any).getTime() >= new Date(endDate as any).getTime()) {
        endDate.setErrors({ compareDates: true });
    } else {
        endDate.setErrors(null);
    }
 };
}
