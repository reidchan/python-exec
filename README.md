# Python Executer

<img width="100" src="https://super-github.oss-cn-shenzhen.aliyuncs.com/package/python-exec.png"/>

<p>
  <img src="https://img.shields.io/badge/version-0.0.5%20-ff69b4.svg"/>
  <img src="https://img.shields.io/packagist/l/doctrine/orm.svg"/>
</p>

> run python scripts and get results back

**No english document yet. just read code plz, it isn't that much.**

## Get Started

```typescript
import { execByText } from 'python-exec';

async function main () {
  const result = await execByText(`print(42);`);
  console.log('Answer to the Ultimate Question of Life, The Universe, and Everything =>', result);
}

try {
  await main();
  // Answer to the Ultimate Question of Life, The Universe, and Everything => 42
} catch (error) {
  throw error
}
```

## Chiness / 中文

> 执行python脚本并返回结果。

**具体使用请查阅[文档](https://www.yuque.com/super2god/open-source/python-exec-v0.0.2)**

# 示例代码
```js
import { execByText } from 'python-exec';

(async () => {
  const result = await execByText(`print('hello guy');`);
  console.log('result =>', result);
})();

// 运行结果：result => hello guy...
```

# 加入小组来面基~
由于本人很少上QQ，所以建的是微信群，而微信群码很快就失效，所以想进交流群的小伙伴加我微信噢\~~我拉你进群，欢迎大佬们加入☺️

<img width="300" src="https://super-github.oss-cn-shenzhen.aliyuncs.com/common/wxqrcode.jpeg"/>
