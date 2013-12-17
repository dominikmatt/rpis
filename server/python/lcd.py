#!/usr/bin/python

import sys, getopt
from Adafruit_CharLCDPlate import Adafruit_CharLCDPlate


# init display
lcd = Adafruit_CharLCDPlate()
if lcd is None:
    sys.exit('Display is not connected')

# check command
def main(argv):
	try:
		opts, args = getopt.getopt(argv,"cods",["="])
	except getopt.GetoptError:
		print('-c <color> : change color')
		print('-o : turn off the lcd')
		print('-d : clear display')
		print('-s <text> : say')
		sys.exit(2)
	
	
	#do command
	for opt, arg in opts:
		print(opt)
		if(opt == '-c'):
			color = args[0]
			print(color)
			if(color == 'red'):
				lcd.backlight(lcd.RED)
			elif(color == 'yellow'):
				lcd.backlight(lcd.YELLOW)
			elif(color == 'green'):
				lcd.backlight(lcd.GREEN)
			elif(color == 'teal'):
				lcd.backlight(lcd.TEAL)
			elif(color == 'blue'):
				lcd.backlight(lcd.BLUE)
			elif(color == 'violet'):
				lcd.backlight(lcd.VIOLET)
			else:
				lcd.backlight(lcd.ON)
		elif(opt == '-o'):
			print('turn off lcd')
			lcd.backlight(lcd.OFF)
		elif(opt == '-d'):
			print('clear display')
			lcd.clear()
		elif(opt == '-s'): 
			text = args[0]
			lcd.clear()
			lcd.message(text)

if __name__ == "__main__":
   main(sys.argv[1:])


#def main(argv):
#   inputfile = ''
#   outputfile = ''
#   try:
#      opts, args = getopt.getopt(argv,"hi:o:",["ifile=","ofile="])
#   except getopt.GetoptError:
#      print 'test.py -i <inputfile> -o <outputfile>'
#      sys.exit(2)
#   for opt, arg in opts:
#      if opt == '-h':
#         print 'test.py -i <inputfile> -o <outputfile>'
 #        sys.exit()
#      elif opt in ("-i", "--ifile"):
#         inputfile = arg
#      elif opt in ("-o", "--ofile"):
#         outputfile = arg
#   print 'Input file is "', inputfile
#   print 'Output file is "', outputfile
#
#if __name__ == "__main__":
#   main(sys.argv[1:])
   
   
   