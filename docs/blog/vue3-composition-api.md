---
layout: doc
title: Vue 3 组合式 API 详解
description: 深入了解 Vue 3 组合式 API 的使用方法和最佳实践。
---

# Vue 3 组合式 API 详解

Vue 3 引入的 Composition API 为 Vue 开发者提供了一种新的编写组件逻辑的方式。相比于 Vue 2 的 Options API，Composition API 提供了更好的逻辑复用和类型推导能力。

## 为什么需要 Composition API？

### Options API 的局限性

在 Vue 2 中，我们使用 Options API 来组织组件：

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello World'
    }
  },
  methods: {
    handleClick() {
      console.log(this.message)
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}
</script>
```

这种方式的问题在于：
- 相关的逻辑被分散在不同的选项中
- 难以提取和复用逻辑
- 类型推导不够完整

### Composition API 的优势

```vue
<template>
  <div>{{ message }}</div>
  <button @click="handleClick">点击</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 响应式数据
const message = ref('Hello World')

// 方法
const handleClick = () => {
  console.log(message.value)
}

// 生命周期钩子
onMounted(() => {
  console.log('Component mounted')
})
</script>
```

Composition API 的优势：
1. **逻辑聚合**：相关的逻辑可以写在一起
2. **更好的类型支持**：完整的 TypeScript 支持
3. **逻辑复用**：可以提取为自定义 hooks
4. **更小的包体积**：tree-shaking 友好

## 核心 API

### ref 和 reactive

`ref` 用于创建基本类型的响应式数据：

```typescript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

`reactive` 用于创建对象的响应式代理：

```typescript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

state.count++
console.log(state.count) // 1
```

### computed 和 watch

`computed` 创建计算属性：

```typescript
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

console.log(doubleCount.value) // 0
count.value++
console.log(doubleCount.value) // 2
```

`watch` 监听数据变化：

```typescript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})
```

### 生命周期钩子

```typescript
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUpdated(() => {
  console.log('Component updated')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
```

## 自定义 Hooks

Composition API 最强大的特性之一就是可以创建自定义 hooks：

```typescript
// useCounter.ts
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

在组件中使用：

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, increment, decrement, reset } = useCounter(10)
</script>
```

## 最佳实践

### 1. 使用 `<script setup>`

`<script setup>` 是 Composition API 的推荐语法糖：

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello World')
</script>
```

### 2. 合理组织逻辑

将相关的逻辑分组：

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 数据相关
const user = ref(null)
const loading = ref(false)

// 方法相关
const fetchUser = async () => {
  loading.value = true
  // 模拟 API 调用
  setTimeout(() => {
    user.value = { name: 'John Doe', email: 'john@example.com' }
    loading.value = false
  }, 1000)
}

// 生命周期
onMounted(() => {
  fetchUser()
})
</script>
```

### 3. 提取自定义 Hooks

将复杂的逻辑提取为自定义 hooks：

```typescript
// useUser.ts
import { ref, onMounted } from 'vue'

export function useUser(userId) {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const fetchUser = async () => {
    try {
      loading.value = true
      error.value = null
      // API 调用
      const response = await fetch(`/api/users/${userId}`)
      user.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchUser)
  
  return {
    user,
    loading,
    error,
    fetchUser
  }
}
```

## 总结

Vue 3 的 Composition API 为我们提供了更灵活、更强大的组件开发方式。通过合理使用 Composition API，我们可以：

- 编写更清晰、更可维护的组件代码
- 更好地复用逻辑
- 享受完整的 TypeScript 支持
- 构建更大的应用程序

希望这篇文章能帮助你更好地理解和使用 Vue 3 的 Composition API！