// yej 技术讨论组的token
const token = '30410c47989ed18663639fa78b867c170bf134a6c4ddf0b110a118aea2cca37c';

const robot = require('./dingding_robot');


(async() => {
    // const res = await robot.text({token, text: 'Hello world'});
    const res = await robot.markdown({
        token, title: "system错误通知", text: `### whatever

> 你好

- one
- two
`
    });
    console.log(res);
})();
