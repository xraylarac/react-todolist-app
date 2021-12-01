import { application } from './application'

application.listen(application.get('port'), () => {
  console.log(
    'App is running at http://localhost:%d in %s mode',
    application.get('port'),
    application.get('env')
  )
})
