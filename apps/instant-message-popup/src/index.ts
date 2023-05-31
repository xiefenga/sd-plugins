import '@/index.less'
import notify from '@/notify'
import { detectLogin } from '@/util'
import 'alertifyjs/build/css/alertify.css'

if (process.env.NODE_ENV === 'development') {
  await detectLogin()
}

notify()


