<template>
    <v-content>
        <v-layout>
            <v-flex>
                <h1>Suppliers</h1>
                <new-supplier></new-supplier>
                <suppliers-table></suppliers-table>
            </v-flex>
        </v-layout>
    </v-content>
</template>
<script>
import NewSupplier from "@/components/Suppliers/NewSupplier"
import SuppliersTable from "@/components/Suppliers/SuppliersTable"
export default {
    components:{
        NewSupplier,
        SuppliersTable
    }
}
</script>

