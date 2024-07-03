# partsbin

A repository to collect and share components for [`lively.next`](https://github.com/LivelyKernel/lively.next).

## About

This is an homage to the [`PartsBin`](https://ieeexplore.ieee.org/abstract/document/6148978), as it already existed in various previous versions of `lively`. Since `lively.next` emphasizes collaborative work via file-based 'projects', we utilize such a project as well to share reusable parts and cool demos with the whole `lively.next` community!

> [!TIP]
> You are welcome to contribute to this collection! Please read the section below.
> Have fun! 🎉

## Contributing

Contributions can be made via a PR to the `main` branch. Please make sure to:

0. Note, that the whole collection is under MIT license.
1. Add a short description of your addition to the README below.
2. Seriously consider adding some tests for your addition. 🙂
3. Store the `partsbin` project via `lively.next` (or make the necessary adaptions manually, if you know what you are doing) in order to update all `lively.project` related files.
4. Bump the minor version for additions/fixes. Bump only the patch version for non-breaking/not-fixing/'optical' changes.
5. We appreciate a clean commit history. This usually involved as few commits as necessary to profit from the history, but not fewer. Additionally, commits should start with an uppercase letter. The first line should not be longer than 72 characters. Additional context in the body of the commit message is of course welcome!


> [!CAUTION]
> **Note to Maintainers:** We try to merge PRs that introduce a new part via *one* merge commit.
> Fixes to already merged parts should usually be merged via rebase.


## Contents

### Clock

A functioning, analogue clock. Rumors say you can find something similar looking in [Switzerland](https://en.wikipedia.org/wiki/Swiss_railway_clock)...

### Magic Wand

A Magic Wand in spirit of one of the original [`LivelyKernel` demos](https://www.youtube.com/watch?v=QTJRwKOFddc).

### Thermometer

A thermometer which can be used as an alternative GUI for number-widgets. Originally developed as a demo for a talk at [FrOSCon '23](https://media.ccc.de/v/froscon2023-2897-live_programming_and_designing_of_dynamic_web_applications).

### Temperature Converter

A simple demo application converting Celsius in Fahrenheit, which provides two alternative front-ends, demonstrating the reuse of `ViewModel`s. Originally developed as a demo for a talk at [FrOSCon '23](https://media.ccc.de/v/froscon2023-2897-live_programming_and_designing_of_dynamic_web_applications).

## Usage

This `partsbin` project comes with `lively.next` and will automatically be kept up to date for you by the system. You can use its contents in the same way you would use any other component in `lively.next`.

## Thanks

to Jens Lincke, the original inventor of the `PartsBin`.

## License

MIT. (c) The `lively.next` community, 2023 onwards.
