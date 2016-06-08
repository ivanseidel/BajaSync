# BajaSync - A station to Sync and manage the car state

This project is intended to be used for the Baja Car from UFABC, as it's an
real-time application to manage the sensors, and even trigger actions from
distance in the car.

The main idea, is to have the Car model in 3D, being shown accordingly with the
IMU's positioned in the car. Those main IMU's will real the state of suspensions,
as well as the orientation and acceleration at each important point.

This software will receive that data, with information about the Fuel Level,
Temperature, Speed, Localization, Mappings from the track, and display in
a nicely created interface, that can be customized for all needs.

## Communication
The communication can happen in two forms: WiFi, or custom Radio like LoRa,
xBee...

The use of WiFi, is achieved by having an RaspberryPy running a Node.JS servers
in the Car Main Controller (`CMC`). Also, custom Radio communications needs to
happen, in order to have a real time feed even with larger distances from the
station.

Communication over Radio is limited, not fully reliable, and can drop packets.
For that reason, Log's from sensors are written to the Car's main controller,
so they can be downloaded later with full time-precision.

Those Log's will be saved, and fetched from BajaSync. Their purpose is to
allow the research of suspension, structure, PowerTrain and many other research
fields that requires good data for simulation and analysis purposes.

## Sensors
For the moment, the sensors being installed in the car will provide information
like:

- Motor RPM
- Wheel speed
- CVT position
- GPS Coordinates
- Motor State (ON/OFF)
- Orientation (Of the car)
- Temperature (Reduction box)
- Angle (4 Suspensions + Steering wheel)

That data will be managed in the software as generics, that can all be logged
in real-time, and have safety warnings limits.

## Logs
Logs can be create both by BajaSync, or fetched from the `CMC` and saved in the
local machine.

## Map
Algorithms running on the `CMC` will record and analyze in real time the car,
creating a 2D map of the track and then, analyze each lap's position, speed,
acceleration, suspensions...

This algorithm of creating the Map, will NOT be based only by the GPS coordinate.
The goal is to use a probabilistic filter to run a Monte-Carlo based approach
by inputing key features that goes from angular speed, suspension FFT, wheel
speed, and also Moving Averages of each of those datas.

This, might provide us with enough data for knowing the location in the track,
and give a visual feedback of 'how good' the pilot is doing.


## BajaSync Technology
BajaSync is entirely coded in ECMAScript (JavaScript and Node.js), using
Electron framework to provide an User Interface based on Chromium. This allows
multi-platform execution, as well as a easy to create UI without limitations.

Node.JS connects and syncs data from the Baja. It acts like a local server for
the UI, by providing it with the necessary informations and events.

The interface with the Radio is done through Serial USB, communicating custom
packets with a custom protocol.

In order to show 3D feedback of the Baja Car, we make use of WebGL and Three.js.
That allows us to build dynamic structures and show in real time.
