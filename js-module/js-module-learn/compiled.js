'use strict';

var _bar_c = require('./bar_c');

var bar = _interopRequireWildcard(_bar_c);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

bar.increase(); /*var moduleBar = require('./bar');
                
                
                moduleBar.increase();
                console.log(moduleBar);*/

console.log(bar);
