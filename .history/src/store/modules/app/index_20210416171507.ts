/*
 * @Description: app moudle
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-16 17:14:53
 */
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module
} from 'vuex'

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import type { AppState } from './state'

export { AppState }

/***
 * Omit去除getters、commit、dispatch，结合自己定义的dispatch、commit方法
 * K extends keyof Mutations，Mutations对应的其中一个key
 * P extends Parameters<Mutations[K]>[1] 获取Mutations[K]函数的第2个参数，即paylod
 */
export type AppStore<S = AppState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
};
export const store: Module<AppState, RootState> = {
  state,
  mutations,
  actions
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
}
