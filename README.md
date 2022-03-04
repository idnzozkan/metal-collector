# Metal Collector

| This is a hardware based web application made for the "Introduction to Robotics" course. If you want to **_completely_** run this web application, you will need to have the hardware part of this project. So, do not forget to check the [**_hardware requirements_**](#hardware-requirements) below in case you want to completely use it. |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

## Introduction

Metal Collector is an industrial robot project for collecting metals from a surface via a web application.

It is possible to examine this project under two main parts: detecting the metals and collecting the metals.

#### 1. Detecting the metals

First of all, the robot has to scan all over the workspace to discover the positions of the metals. In order to do this, normally you will need to use a sensor called `inductive sensor`. Using an inductive sensor it is possible to determine whether an object is a metal or not. However, since I did not use one, I just skipped this detecting part by "mocking" the use of the inductive sensor. After this detecting part, you would normally have a generated JSON file that includes the detected metals with their positions on the workspace. You can find my own "dummy" JSON file at `server/src/fake-data/dummy-metals.json`. So, you need to keep in mind that this project just assumes that there are a few metals at the pre-specified positions.

#### 2. Collecting the metals

After the scanning process, you will see the detected (fake) metals on the web interface according to their detected positions. By collecting them through the web interface you will no longer see them in the workspace screen. Of course, it is possible to collect real metals if you use an `electromagnet` on the robot. However, I just simulated this action since I did not use one.

(See the [usage section](#usage) to learn more.)

<p align="center">
	<img src="@readme-images/introduction.png">
	<b>Image:</b> Web App and Robot
</p>
  
###  Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)

  - [Hardware requirements](#hardware-requirements)
  - [Software requirements](#software-requirements)

- [Installation](#installation)

  - [Setting up the robot](#setting-up-the-robot)
  - [Firmware installation for Arduino](#firmware-installation-for-arduino)
  - [Editing the config.json file](#editing-the-configjson-file)
  - [Installing the dependencies](#installing-the-dependencies)
    - [Server](#server)
    - [Client](#client)

- [Running the application](#running-the-application)
  - [Server](#server-1)
  - [Client](#client-1)
- [Usage](#usage)
  - [Controlling the robot movement](#controlling-the-robot-movement)
  - [Set to Zero and Reset to Zero](#set-to-zero-and-reset-to-zero)
  - [Scanning and collecting the metals](#scanning-and-collecting-the-metals)
- [Technologies](#technologies)
  - [Server](#server-2)
  - [Client](#client-2)
- [Important notes](#important-notes)

- [License](#license)

## Requirements

### Hardware Requirements

For the mechanical part of this project, I based a `drawing robot` project. So, if you want to build the same robot, please take a look at [this thing](https://www.thingiverse.com/thing:2349232) for the needed materials.

### Software Requirements

- [Arduino IDE](https://www.arduino.cc/en/software) - Just needed for flashing Grbl to Arduino
- [Grbl](https://github.com/grbl/grbl) - Required for robot movement
- [Node.js](https://nodejs.org) - I recommend you to use the up-to-date version

## Installation

### Setting up the robot

You can follow [this amazing guide](https://test3dprints.com/arduino/homework-writing-machine) to setup the mechanical part step by step.

### Firmware installation for Arduino

You need to flash Grbl to your Arduino. If you don't have an idea about how to do this, you can [take a look at this official wiki page](https://github.com/grbl/grbl/wiki/Compiling-Grbl).

### Editing the config.json file

You can edit the config.json file to change the default settings. In order to do this go to `server/src/config.json`.

    {
        "port": "/dev/ttyUSB0",
        "stepSize": "20",
        "feedRate": "10000",
        "xMax": "255",
        "xMin": "0",
        "yMax": "0",
        "yMin": "-185"
    }

- **port:** Specify the port your Arduino is connected to. (_Launch the Arduino IDE and then, from the drop-down menu navigate to `Tools > Port` to see the connected port_).
- **stepSize:** The amount of how many millimeters it will move in each step when using the control buttons.
- **feedRate:** Movement speed (10000 is recommended).
- **xMax:** The highest value that the robot can reach in the X+ direction on the workspace.

### Installing the dependencies

lorem ipsum dolor sit amet

#### Server

lorem ipsum dolor sit amet

#### Client

lorem ipsum dolor sit amet

## Running the application

### Server

lorem ipsum dolor sit amet

### Client

lorem ipsum dolor sit amet

## Usage

### Controlling the robot movement

<p align="center">
    <img src="@readme-images/controlling-the-robot-movement.gif">
</p>

### Set to Zero and Reset to Zero

<p align="center">
    <img src="@readme-images/set-to-zero-and-reset-to-zero.gif">
</p>

### Moving to a specific position

<p align="center">
    <img src="@readme-images/set-to-zero-and-reset-to-zero.gif">
</p>

### Scanning and collecting the metals

<p align="center">
    <img src="@readme-images/scanning-and-collecting-the-metals.gif">
</p>

## Technologies

### Server

Express.js, Socket.IO

### Client

React.js, Styled Components, Socket.IO

## Important notes

lorem ipsum dolor sit amet

## License

lorem ipsum dolor sit amet
