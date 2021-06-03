<template>
    <b-container>          
    <b-card class="text-center mb-4">
        <fr-manageuser-table v-if="$root.userStore.state.adminUser === true" ></fr-manageuser-table>
    </b-card>             
    </b-container>
</template>

<script>
    // import _ from 'lodash';
    // import ManageuserList from '@/components/manageuser/ManageuserList';
    import ManageuserTable from '@/components/manageuser/ManageuserTable';
    // import Testfilter from '@/components/manageuser/Testfilter';

    /**
     * @description List Managed User and can add managed user)
     *
     * @fires Get type/name/id (e.g. managed/user/managed/user?_queryId=query-all) - Get all user
     */
    export default {
        name: 'manageuser',
        props: {
            'clientToken': String,
            'linkedProvider': String,
            'openProfile': {
                required: false,
                default: false
            }
        },
        components: {
            // 'fr-manageuser-list': ManageuserList,
            'fr-manageuser-table': ManageuserTable
            // 'fr-testfilter': Testfilter
        }
    };
</script>