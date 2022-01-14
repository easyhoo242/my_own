import { ref } from '@vue/composition-api'
import { Message } from 'element-ui'
import {
  getCompanyUserSaveScreen,
  getCompanyAddUserSaveScreen,
  getCompanyDelUserSaveScreen
} from '@/api'
import { UPDATE_MODEL_EVENT, ToRefs } from '@/utils'
import {
  useCreateSaveScreenDialog,
  SaveScreenTypes
} from '@/components/global/SaveScreenDialog/index.ts'
import {
  compatAddressToSaveOptions,
  compatGetValue,
  compatDateValue,
  compatMergeOptions
} from '@/components/global/SaveScreenDialog/utils.ts'
import { CompanyScreenValues } from '../Screen/interface'

export const useSaveScreen = (
  {
    keyword: keywordsVal,
    tag: tagSelectVal,
    scope: scopeVal,
    round: roundVal,
    address: addressVal,
    fd: fdVal,
    state: stateVal,
    selected: selectedVal,
    date: dateVal
  }: ToRefs<CompanyScreenValues>,
  emit: (event: string, ...args: any[]) => void
) => {
  const saveScreenChanged = ref(true)
  const saveScreenLoading = ref(false)

  return {
    ...useCreateSaveScreenDialog({
      fetchRequest: () => getCompanyUserSaveScreen(),
      type: SaveScreenTypes.COMPANY,
      onScreen: (mapValues, onClose) => {
        emit(UPDATE_MODEL_EVENT, mapValues)
        onClose()
      },
      onDel: (id) => getCompanyDelUserSaveScreen(id)
    }),
    saveScreenChanged,
    saveScreenLoading,
    handleDelSaveScreen: (id: number) => getCompanyDelUserSaveScreen(id),
    handleAddSaveScreenOptions: async () => {
      saveScreenLoading.value = true

      try {
        await getCompanyAddUserSaveScreen(
          JSON.stringify(
            compatMergeOptions({
              listSearchScope: compatGetValue(scopeVal.value.scope),
              listSearchSubScope: compatGetValue(scopeVal.value.subScopes),
              listSearchRound: compatGetValue(roundVal),
              listSearchTime: compatDateValue(dateVal.value),
              listSearchStatus: compatGetValue(stateVal),
              listSearchOnStatus: compatGetValue(fdVal),
              listSearchOrange: compatGetValue(selectedVal),
              ...compatAddressToSaveOptions(addressVal.value),
              listSearchKeyword: compatGetValue(keywordsVal.value),
              listSearchTag: compatGetValue(tagSelectVal.value)
            })
          )
        )
        saveScreenChanged.value = true
        setTimeout(() => {
          saveScreenLoading.value = false
          Message.success('保存成功')
        }, 300)
      } catch (e) {}
    }
  }
}
