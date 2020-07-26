import requests
import RPi.GPIO as gpio
import time
import sys

url = "http://openhab.cb7.com"
item = "BedroomDisplay_Switch"
loop_delay = 1  # seconds

relay_pin = 4

if __name__ == "__main__":
    gpio.setmode(gpio.BCM)

    gpio.setup(relay_pin, gpio.OUT, initial=gpio.LOW)

    while True:       
        try:
            time.sleep(loop_delay)          
        
            # get item
            itemResult = requests.get(url+"/rest/items/"+item+"/state")

            # if item switch is on turn relay on
            gpio.output(relay_pin, itemResult.text == "OFF")

        except KeyboardInterrupt:          # trap a CTRL+C keyboard interrupt
            gpio.cleanup()                 # resets all GPIO ports used by this program
            sys.exit("Program stopped using CTRL+C")
