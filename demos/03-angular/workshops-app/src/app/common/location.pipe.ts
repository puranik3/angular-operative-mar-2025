import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '../workshops/models/IWorkshop';

export type LocationFormat = 'short' | 'long';

@Pipe({
  name: 'location',
  standalone: true,
  pure: true, // good practice - add this only for pipes that give a predictable output
})
export class LocationPipe implements PipeTransform {
  transform(
    location: ILocation,
    format: LocationFormat = 'long',
    numChars = 80
  ) {
    let locationStr = `${location.address}, ${location.city}, ${location.state}`;

    if (format === 'short') {
      locationStr = locationStr.substring(0, numChars) + '...';
    }

    return locationStr;
  }
}
