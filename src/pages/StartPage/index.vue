<template>
  <h1 class="title">Форма подачи заявки в отдел сервиса и качества</h1>
  <form @submit.prevent="submitForm" class="form__container">
    <div class="section__container">
      <h4 class="section__title">
        Ваш филиал
        <span class="required">*</span>
      </h4>
      <div class="select__container">
        <button
          :disabled="isOnline"
          @click.prevent="showingDropdawn"
          class="select__title"
        >
          {{ formValue.filial ? formValue.filial : "Выберите город" }}
          <img
            class="select__arrow"
            src="@/assets/image/arrow-down.png"
            alt="arrow"
            :style="{
              transform: showDropdawn ? 'rotate(180deg)' : 'none',
            }"
          />
        </button>
        <div
          :style="{
            display: showDropdawn ? 'block' : 'none',
          }"
          class="select__dropdawn"
          @click.stop
        >
          <ul class="select__list">
            <li
              :key="cityInfo.id"
              v-for="cityInfo in valueDropdawn"
              class="select__item"
              @click="setFilialValue(cityInfo.title)"
            >
              {{ cityInfo.title }}
            </li>
          </ul>
        </div>
      </div>
      <label class="online__container">
        <div class="online__container-input">
          <input class="online__input" type="checkbox" v-model="isOnline" />
          <div></div>
        </div>
        <p class="online__text">Онлайн</p>
      </label>
    </div>
    <div class="section__container">
      <h4 class="section__title">
        Тема обращения
        <span class="required">*</span>
      </h4>
      <div>
        <label
          @click.prevent="setTheme(theme.name)"
          class="theme__label"
          :key="theme"
          v-for="theme in arrayTheme"
        >
          <input
            :checked="theme.check"
            class="theme__input"
            name="theme"
            type="radio"
          />
          <p class="theme__text">{{ theme.name }}</p>
        </label>
      </div>
      <input
        @input="setTheme(null)"
        v-model="themeUser"
        class="theme__input-text"
        type="text"
        placeholder="Другое"
      />
    </div>
    <div class="section__container">
      <h4 class="section__title">
        Описание проблемы
        <span class="required">*</span>
      </h4>
      <textarea
        v-model="formValue.problem"
        class="form__textarea"
        rows="5"
      ></textarea>
    </div>
    <div class="section__container">
      <h4 class="section__title">Загрузка документов</h4>
      <p class="description">
        <span>Приложите пожалуйста полноэкранный скриншот.</span>
        <span>Это поможет быстрее решить проблему.</span>
      </p>
      <input type="file" />
    </div>
    <button :disabled="disabledSumbit" class="form__submit" type="submit">
      Отправить
    </button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  onDeactivated,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { api_submitForm } from "@/api/index";

import type { IAppStore, ICityInformation } from "@/store/types";

export default defineComponent({
  setup() {
    const $store = useStore<IAppStore>();
    const $router = useRouter();

    // Форма
    const formValue = reactive({
      filial: "",
      theme: "",
      problem: "",
    });

    const submitForm = () => {
      api_submitForm()
        .then((res) => {
          $router.push({
            name: "SuccessPage",
          });
        })
        .catch((er) => {
          $router.push({
            name: "UnsuccessPage",
          });
        });
    };
    const checkForm = () => {
      if (formValue.filial && formValue.theme && formValue.problem) {
        disabledSumbit.value = false;
      } else {
        disabledSumbit.value = true;
      }
    };

    // Селект
    const valueDropdawn = ref<Array<ICityInformation>>($store.state.city);
    const setFilialValue = (name: string) => {
      formValue.filial = name;
      hideDropdawn();
    };
    const showDropdawn = ref<boolean>(false);
    const showingDropdawn = (ev: MouseEvent) => {
      showDropdawn.value = true;
      ev.stopPropagation();
    };
    const hideDropdawn = () => {
      showDropdawn.value = false;
    };
    // Тема обращения
    const arrayTheme = ref(
      $store.state.theme.map((theme) => {
        return {
          name: theme,
          check: false,
        };
      })
    );
    const themeUser = ref<string>("");
    const setTheme = (nameTheme: string | null) => {
      if (nameTheme) {
        arrayTheme.value = arrayTheme.value.map((theme) => {
          if (theme.name === nameTheme) {
            return {
              name: theme.name,
              check: true,
            };
          } else {
            return theme;
          }
        });
        themeUser.value = "";
        formValue.theme = nameTheme;
      } else {
        if (themeUser.value) {
          arrayTheme.value = arrayTheme.value.map((theme) => {
            return {
              name: theme.name,
              check: false,
            };
          });
        }
        formValue.theme = themeUser.value;
      }
    };
    // Жизненные циклы
    onMounted(() => {
      window.addEventListener("click", hideDropdawn);
      $store.dispatch("getCity").then((res) => {
        valueDropdawn.value = res;
      });
    });
    onDeactivated(() => {
      window.removeEventListener("click", hideDropdawn);
    });

    const isOnline = ref<boolean>(false);
    const disabledSumbit = ref<boolean>(true);

    watch(
      () => {
        return [formValue.filial, formValue.theme, formValue.problem];
      },
      () => {
        checkForm();
      }
    );

    return {
      setFilialValue,
      valueDropdawn,
      showDropdawn,
      showingDropdawn,

      arrayTheme,
      themeUser,
      setTheme,

      formValue,
      submitForm,
      disabledSumbit,
      isOnline,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/scss/_variables.scss";
@import "@/styles/scss/_expansion.scss";

.title {
  margin-bottom: 20px;
  color: $GrayNormal;
}

.description {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  font-size: 14px;
}

.form {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 2px solid $GrayLight;
    border-radius: 5px;
    width: 50vw;
    padding: 30px;
    color: $GrayNormal;
  }

  &__textarea {
    border: 1px solid $GrayLight;
    padding: 10px;

    @extend %effect-input;
  }

  &__submit {
    padding: 15px;
    border-radius: 5px;
    border: none;
    color: white;
    cursor: pointer;
    background-color: $OrangeNormal;
    max-width: 200px;

    &:disabled {
      cursor: default;
      opacity: 0.6;
      background-color: $GrayNormal;
    }
  }
}

.select {
  &__container {
    display: inline-flex;
    position: relative;
    max-width: 200px;

    &:disabled {
      color: rgb(185, 171, 171);
    }
  }

  &__arrow {
    width: 10px;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px;
    border: 1px solid $GrayLight;
    background-color: white;
    border-radius: 5px;
  }

  &__dropdawn {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background-color: white;
    border: 1px solid $GrayLight;
    z-index: 5;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
  }

  &__item {
    cursor: pointer;

    @extend %effect-text;
  }
}

.section {
  &__container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  &__title {
    margin-bottom: 10px;
    font-size: 20px;
  }
}

.online {
  &__container {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    gap: 5px;
    max-width: 150px;
    cursor: pointer;

    &-input {
      position: relative;
    }
  }
  &__input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border: none;
    outline: none;

    & + div {
      padding: 10px;
      border: 1px solid black;
      border-radius: 5px;
    }
  }
}

.theme {
  &__label {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;

    @extend %effect-text;
  }

  &__input {
    width: 20px;
    height: 20px;
    cursor: pointer;

    &-text {
      padding: 5px;
      border: 1px solid $GrayLight;
      border-radius: 5px;

      @extend %effect-input;
    }
  }
}
</style>
