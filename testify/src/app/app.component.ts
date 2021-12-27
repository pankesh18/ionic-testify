import { Component } from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private deviceOrientation: DeviceOrientation) {

    console.log('app component')


    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => console.log(data),
      (error: any) => console.log(error)
    );

    var subscription = this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) => console.log(data)
    );

    subscription.unsubscribe();
  }





}
