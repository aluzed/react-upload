## React Upload

## Dependencies

Use Bootstrap for the progress bar.

## To Use
```html
<!-- ... HTML HEADER... -->
<body>

  <div id="main"></div>

  <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

  <script src="/path/to/react-upload/dist/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      $ReactUpload('main', 'http://localhost:3000/send');
    })
  </script>
</body>
```

## Parameters

When you call the $ReactUpload function :

| Parameter      | Format | Description                                       |
|----------------|:-------|:--------------------------------------------------|
|Element Id      | String | Element where we will inject the upload container |
|Destination Url | String | Url to send data                                  |

## To test

In a terminal

```
cd test-server
npm i
node index.js
```

In a second terminal
```
npm install
npm install -g http-server
npm run build
cd dist
http-server
```
