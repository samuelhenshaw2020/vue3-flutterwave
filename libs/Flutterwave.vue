<template>
  <button @click="makePayment">{{ text || "Pay now" }}</button>
</template>

<script lang="ts" setup >
import { onMounted, onUnmounted, ref } from "vue";
import { IFWOptions } from "./typings";
import useScriptLoader from "../libs/useScriptLoader";

declare function FlutterwaveCheckout(options: IFWOptions): void;

const props = defineProps<{options: IFWOptions , text: string}>();
const emit =  defineEmits(["err"])
const loaded = ref<boolean>(false)

const onError = () => {
    emit('err');
}

async function loadScript() {
    try {
      loaded.value = await useScriptLoader();
    } catch (error) {
      loaded.value = false;
      onError();
    }
}

function makePayment() {

    if(loaded.value == false) return;

    const _params: IFWOptions = {
        public_key: props.options?.public_key,
        tx_ref: props.options?.tx_ref,
        amount: props.options?.amount,
        currency: props.options?.currency,
        payment_options: props.options?.payment_options || null,
        redirect_url: props.options?.redirect_url || null,
        meta: props.options?.meta || null,
        customer: props.options?.customer || null,
        customizations: props.options.customizations || null
    }
  
  FlutterwaveCheckout(_params);
}

onMounted(() => {
  loadScript()
});

</script>
