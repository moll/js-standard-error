## Unreleased
- Allows overwriting the `stack` property if given in the object:

  ```javascript
  new StandardError({stack: stackOverflow})
  ```

- Fixes stack's first line when name given in the object:

  ```javascript
  new StandardError({name: "UnknownError"})
  ```

## 1.0.0 (May 1, 2014)
- First standard release.  
  There are now [15 competing standards](https://xkcd.com/927/)!
