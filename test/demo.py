import os
filename = './hello.txt'
with open(filename, 'w') as file_object:
  file_object.write('hello guy')