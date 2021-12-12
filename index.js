import gerbilCnc from 'gerbil-cnc'

let gerbil = gerbilCnc('COM5')

gerbil.machineReady.then(() => gerbil.writeLine('$J=G21G91X20Y-20F10000')).then(console.log)