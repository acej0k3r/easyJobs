import React, { useCallback, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'


import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'


const tabs = ["About", "Qualifications", "Responsibilities"]


const JobId = () => {
   //standard
   const params = useSearchParams();
   const router = useRouter();
   //state
   const [refreshing, setRefreshing] = useState(false);
   const [activeTab, setActiveTab] = useState(tabs[0]);



   const { data, isLoading, error, refetch } = useFetch('job-details', {
      job_id: params.id
   })
   //function

   function onRefresh() {

      try {
         setRefreshing(true);
         refetch();
      } catch (error) {

      } finally {
         setRefreshing(false);

      }



   }

   function displayTabContent() {
      switch (activeTab) {
         case "Qualifications":
            //code 

            return <Specifics
               title="Qualifications"
               points={data[0].job_highlights?.Qualifications ?? ['N/A']}
            />


         case "About":

            return <JobAbout
               info={data[0].job_highlights?.Qualifications ?? ['No Data Provided']}
            />

         case "Responsibilities":

            return <Specifics
               title="Responsibilities"
               points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
            />


         default:

            break

      }
   }


   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}

      >
         <Stack.Screen
            options={{
               headerStyle: { backgroundColor: COLORS.tertiary },
               headerTitle: 'Job Details',
               headerLeft: () => (

                  <ScreenHeaderBtn
                     mstyle={true}
                     iconUrl={icons.left}
                     dimension="60%"
                     handlePress={() => router.back()}
                  />

               ),
               headerRight: () => (
                  <ScreenHeaderBtn
                     mstyle={true}
                     iconUrl={icons.share}
                     dimension="60%"
                  />

               ),



            }}
         />

         <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
               {
                  isLoading ? (
                     <ActivityIndicator size={'large'} color={COLORS.primary} />
                  ) : error ? (
                     <Text >Something went wrong</Text>
                  ) : data.length === 0 ? (
                     <Text >No Data</Text>
                  ) : (
                     <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                        <Company
                           companyLogo={data[0].employer_logo}
                           jobTitle={data[0].job_title}
                           companyName={data[0].employer_name}
                           location={data[0].job_country}
                        />

                        <JobTabs
                           tabs={tabs}
                           activeTab={activeTab}
                           setActiveTab={setActiveTab}
                        />

                        {
                           displayTabContent()

                        }


                     </View >

                  )
               }

            </ScrollView>

            <JobFooter
               url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
               id={params.id}
               data={data[0]}
            />

         </>

      </SafeAreaView>

   )
}


export default JobId;