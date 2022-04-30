const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;
const prompts = require('prompts');

(async () => {
  let iosSimulators = (await exec('xcrun simctl list')).stdout.split('\n');
  iosSimulators = iosSimulators.slice(iosSimulators.indexOf('== Devices ==') + 1, iosSimulators.indexOf('== Device Pairs =='));
  iosSimulators = iosSimulators.map(choice => {
    if (choice.startsWith('--') || choice.startsWith('==')) return { title: choice, disabled: true };

    let pieces = choice.split('(');
    const title = pieces.splice(0, pieces.length-2).join('(').trim();
    const value = pieces.splice(-2)[0].toString().replace(')', '').trim();

    return { title, value }
  })

  const androidEmulators = (await exec('emulator -list-avds')).stdout.split('\n').slice(0, -1).map(choice => ({
    title: choice,
    value: choice
  }))

  const response = await prompts([
    {
      type: 'select',
      name: 'platform',
      message: 'Choose platform',
      choices: [
        { title: 'iOS', value: 'ios' },
        { title: 'Android', value: 'android' },
      ],
    },
    {
      type: platform => platform == 'ios' ? 'autocomplete' : null,
      name: 'ios',
      message: 'Choose simulator',
      choices: iosSimulators,
    },
    {
      type: platform => platform == 'android' ? 'autocomplete' : null,
      name: 'android',
      message: 'Choose emulator',
      choices: androidEmulators,
    }
  ]);

  if (response.platform === 'ios') {
    await exec(`open -a Simulator.app --args -CurrentDeviceUDID ${response.ios}`);
  } else {
    spawn('emulator', ['-avd', response.android, '-noaudio'], {
      stdio: 'ignore',
      detached: true
    }).unref();
  }
})();