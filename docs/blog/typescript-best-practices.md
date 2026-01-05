---
layout: doc
title: TypeScript 最佳实践
description: 掌握 TypeScript 的最佳实践，写出更安全、更可维护的代码。
---

# TypeScript 最佳实践

TypeScript 为 JavaScript 添加了静态类型检查，让我们能够编写更安全、更可维护的代码。本文将分享一些 TypeScript 的最佳实践。

## 为什么使用 TypeScript？

### 类型安全
```typescript
// JavaScript
function add(a, b) {
  return a + b
}

console.log(add(1, '2')) // "12" - 意外的结果

// TypeScript
function add(a: number, b: number): number {
  return a + b
}

console.log(add(1, 2)) // 3
console.log(add(1, '2')) // 编译时错误
```

### 更好的开发体验
- 智能提示
- 重构支持
- 即时错误检测

## 基本类型定义

### 基础类型
```typescript
// 基础类型
const name: string = 'John Doe'
const age: number = 30
const isActive: boolean = true
const hobbies: string[] = ['reading', 'coding']
const person: { name: string; age: number } = { name: 'John', age: 30 }

// 数组类型
const numbers: number[] = [1, 2, 3, 4, 5]
const names: Array<string> = ['Alice', 'Bob', 'Charlie']

// 函数类型
const greet: (name: string) => string = (name) => `Hello, ${name}!`

// 对象类型
interface User {
  id: number
  name: string
  email: string
  isActive: boolean
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  isActive: true
}
```

### 联合类型和交叉类型
```typescript
// 联合类型
type Status = 'pending' | 'approved' | 'rejected'
type ID = string | number

function getStatus(id: ID): Status {
  // 实现逻辑
  return 'pending'
}

// 交叉类型
interface Person {
  name: string
}

interface Employee {
  employeeId: number
}

type PersonEmployee = Person & Employee

const employee: PersonEmployee = {
  name: 'John Doe',
  employeeId: 12345
}
```

## 泛型 (Generics)

### 基本泛型
```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

const stringResult = identity<string>('hello') // 'hello'
const numberResult = identity<number>(42) // 42
const inferResult = identity('auto inferred') // 'auto inferred'

// 泛型接口
interface Container<T> {
  value: T
}

const stringContainer: Container<string> = { value: 'hello' }
const numberContainer: Container<number> = { value: 42 }

// 泛型类
class Box<T> {
  private content: T

  constructor(initialContent: T) {
    this.content = initialContent
  }

  getContent(): T {
    return this.content
  }

  setContent(content: T): void {
    this.content = content
  }
}

const box = new Box<string>('initial')
box.setContent('updated')
console.log(box.getContent()) // 'updated'
```

### 约束条件
```typescript
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length)
}

logLength('hello') // 5
logLength([1, 2, 3]) // 3
logLength({ length: 10, value: 'test' }) // 10
logLength(123) // 编译错误：number 没有 length 属性
```

## 高级类型

### 映射类型
```typescript
interface User {
  id: number
  name: string
  email: string
}

// 全部属性变为可选
type PartialUser = Partial<User>
// 等价于：
// type PartialUser = {
//   id?: number
//   name?: string
//   email?: string
// }

// 全部属性变为只读
type ReadonlyUser = Readonly<User>
// 等价于：
// type ReadonlyUser = {
//   readonly id: number
//   readonly name: string
//   readonly email: string
// }

// 提取特定属性
type UserKeys = keyof User // "id" | "name" | "email"

type UserIdName = Pick<User, 'id' | 'name'>
// 等价于：
// type UserIdName = {
//   id: number
//   name: string
// }

type UserWithoutEmail = Omit<User, 'email'>
// 等价于：
// type UserWithoutEmail = {
//   id: number
//   name: string
// }
```

### 条件类型
```typescript
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string> // true
type Test2 = IsString<number> // false

// 实用条件类型
type NonNullable<T> = T extends null | undefined ? never : T

type Test3 = NonNullable<string | null> // string
type Test4 = NonNullable<number | undefined> // number
```

## 装饰器 (Decorators)

### 类装饰器
```typescript
function sealed(constructor: Function) {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
}

@sealed
class Person {
  name: string
  
  constructor(name: string) {
    this.name = name
  }
}
```

### 方法装饰器
```typescript
function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false
}

class Calculator {
  @readonly
  add(a: number, b: number): number {
    return a + b
  }
}

const calc = new Calculator()
// calc.add = () => 0 // 编译错误：add 方法是只读的
```

## 工具类型实践

### API 响应类型
```typescript
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: number
}

// 用户相关 API 响应
type UserResponse = ApiResponse<{
  id: number
  name: string
  email: string
}>

// 错误处理
type ApiError = {
  success: false
  error: {
    code: string
    message: string
  }
  timestamp: number
}

type ApiResult<T> = ApiResponse<T> | ApiError
```

### React/Vue 组件 Props 类型
```typescript
interface BaseProps {
  className?: string
  id?: string
}

interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

function Button({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  className = '', 
  onClick,
  children 
}: ButtonProps) {
  // 实现逻辑
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

## 配置和工具

### tsconfig.json 优化
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "checkJs": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    
    /* 严格检查 */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    
    /* 模块解析 */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

### 实用工具类型库
```typescript
// 常见工具类型
export type Nullable<T> = T | null
export type Undefinedable<T> = T | undefined
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]
```

## 最佳实践总结

### 1. 优先使用 const 断言
```typescript
// 好的做法
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const

// 避免
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
}
```

### 2. 使用接口而不是类型别名（对于对象形状）
```typescript
// 推荐：接口
interface User {
  id: number
  name: string
}

// 避免：类型别名（对于对象）
type User = {
  id: number
  name: string
}
```

### 3. 启用严格模式
在 `tsconfig.json` 中启用所有严格检查选项。

### 4. 使用工具类型
利用 TypeScript 内置的工具类型来创建更灵活的 API。

### 5. 避免 any 类型
```typescript
// 避免
function processData(data: any): any {
  return data
}

// 推荐
function processData<T>(data: T): T {
  return data
}
```

## 总结

TypeScript 是一个强大的工具，能够帮助我们编写更安全、更可维护的代码。通过遵循这些最佳实践，我们可以充分发挥 TypeScript 的优势：

- 提供更好的开发体验
- 减少运行时错误
- 改善代码可读性和可维护性
- 支持大规模应用开发

希望这些最佳实践能帮助你在项目中更好地使用 TypeScript！