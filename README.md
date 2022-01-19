# Gift Unwrapping
The Gift Unwrapping of 4Gift service

## Foundation elements

The preview of the GiftUnwrapping will appear in _reveal_ modal because 4Gift project run under the Foundation framework, we need to replicate perfectly the environment.

## Versions

At the moment, the system of versioning is very trivial.
Whenever it is necessary add feature or bugfix on both JS and CSS, a new file with the new version should be created.
Do not forget: **when CSS version is updated, it should be updated in the JS as well**

## Animation settings
The GiftUnwrapping JS class is provided with a JSON parameter named `animationDurations` that allows to customize the timing of the different animations of each element. To do so, it is sufficient to replace the default numerical values with the desired ones.

## Delivery system
At the moment the delivery service used for media is https://cdn.jsdelivr.net/.
### Purge
in the host, replace the "cdn" with "purge" wait some seconds before the cancellation is effective