"use client"

import { Button, DatePicker, Field, Heading, HStack, Input, parseDate, Portal, RadioCard, Separator, SimpleGrid, Steps, Text, useSteps, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuCalendar } from "react-icons/lu";

import { motion } from "motion/react";
import { ServiceCardItem } from "@/components/ui/service-card-item";
import { useState } from "react";

import { dayjs } from "@/lib/dayjs";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Date = { year: number, month: number, day: number }

const agendarStep3FormSchema = z.object({
  fullname: z.email().nonempty("Nome completo é obrigatório"),
  phone: z.string().nonempty("Telefone é obrigatório"),
  model: z.string().nonempty("Modelo do carro é obrigatório"),
  licensePlate: z.string().nonempty("Placa é obrigatória"),
});

type AgendarFormData = z.infer<typeof agendarStep3FormSchema>

export default function Agendar() {
  const steps = useSteps({
    defaultStep: 0,
    count: items.length,
  });

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(agendarStep3FormSchema) });

  function handleGoToPrevStep() {
    if (steps.hasPrevStep) {
      steps.goToPrevStep();
    } else {
      router.push("/");
    }
  }

  const [value, setValue] = useState<string | null>(null)
  const [selectHour, setSelectHour] = useState<string | null>(null);

  const avalibleHours = ["8", "9", "10", "11", "13", "14", "15", "16", "17"];

  const isDateUnavailable = (date: Date) => {
    const selectedDate = dayjs
      .tz(`${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`,
        "America/Sao_Paulo",
      )
      .startOf("day");

    const today = dayjs.tz(undefined, "America/Sao_Paulo").startOf("day");

    const isPastDate = selectedDate.isBefore(today, "day");
    const isSunday = selectedDate.day() === 0;

    return isPastDate || isSunday;
  }

  function handleAgendar(data: AgendarFormData) {
    console.log(steps.value, data);
  }

  return (
    <VStack as="main" gap={0}>
      <VStack w="100%" maxW={1440} mx="auto" as="section" align="start" pt={28} pb={16} px={6}>
        <Button onClick={handleGoToPrevStep} variant="ghost" rounded="lg" mb={6}>
          <LuArrowLeft />
          {steps.hasPrevStep ? "Voltar" : "Inicio"}
        </Button>

        <Heading as="h1" fontSize="4xl" mb={2}>Agendar Serviço</Heading>

        {!steps.isCompleted && <Text mb={8}>Passo {steps.value + 1} de {steps.count}</Text>}

        {steps.isCompleted && <Text mb={8}>Completo!</Text>}

        <Steps.RootProvider as="form" value={steps} onSubmit={handleSubmit(handleAgendar)} gap={10}>
          <Steps.List gap={4}>
            {items.map((step, index) => (
              <Steps.Item flex={1} key={index} index={index} title={step.title}>
                <Separator w="100%" borderColor={steps.value >= index ? "yellow.500" : "white"} borderWidth={2} />
              </Steps.Item>
            ))}
          </Steps.List>

          {items.map((step, index) => (
            <Steps.Content key={index} index={index}>
              {index === 0 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="yellow.300" mb={4}>Escolha o Serviço</Heading>

                  <RadioCard.Root value={value} onValueChange={(e) => setValue(e.value)} gapY={4}>
                    <ServiceCardItem value="polimento-premium" name="Polimento Premium" duration="3h" price="1200,00" />

                    <ServiceCardItem value="vitrificacao" name="Vitrificação" duration="5h" price="800,00" />

                    <ServiceCardItem value="lavagem-detalhada" name="Lavagem Detalhada" duration="1h30" price="120,00" />

                    <ServiceCardItem value="higienizacao-interna" name="Higienização Interna" duration="2h" price="250,00" />
                  </RadioCard.Root>
                </motion.div>
              )}

              {index === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="yellow.300" mb={4}>Data e Horário</Heading>

                  <Field.Root>
                    <Field.Label color="yellow.300">Data</Field.Label>
                    <Field.Context>
                      {(ctx) => (
                        <DatePicker.Root
                          invalid={ctx.invalid}
                          ids={{ label: () => ctx.ids.label, input: () => ctx.ids.control }}
                          locale="pt-BR"
                          timeZone="America/Sao_Paulo"
                          size="lg"
                          defaultValue={[parseDate(new Date())]}
                          isDateUnavailable={isDateUnavailable}
                        >
                          <DatePicker.Control>
                            <DatePicker.IndicatorGroup>
                              <DatePicker.Trigger>
                                <LuCalendar />
                              </DatePicker.Trigger>
                            </DatePicker.IndicatorGroup>
                            <DatePicker.Input rounded="lg" />
                          </DatePicker.Control>

                          <Portal>
                            <DatePicker.Positioner>
                              <DatePicker.Content>
                                <DatePicker.View view="day">
                                  <DatePicker.Header />
                                  <DatePicker.DayTable />
                                </DatePicker.View>
                                <DatePicker.View view="month">
                                  <DatePicker.Header />
                                  <DatePicker.MonthTable />
                                </DatePicker.View>
                                <DatePicker.View view="year">
                                  <DatePicker.Header />
                                  <DatePicker.YearTable />
                                </DatePicker.View>
                              </DatePicker.Content>
                            </DatePicker.Positioner>
                          </Portal>
                        </DatePicker.Root>
                      )}
                    </Field.Context>
                    <Field.ErrorText>Date of birth is required</Field.ErrorText>
                  </Field.Root>

                  <Field.Root mt={5}>
                    <Field.Label color="yellow.300">Horário</Field.Label>

                    <RadioCard.Root
                      value={selectHour}
                      onValueChange={(e) => setSelectHour(e.value)}
                      orientation="horizontal"
                      colorPalette="yellow"
                      variant="outline"
                      size="lg"
                    >
                      <HStack gap={3} flexWrap="wrap">
                        {avalibleHours.map((hour) => (
                          <RadioCard.Item key={hour} value={hour} w="auto" rounded="lg">
                            <RadioCard.ItemHiddenInput />

                            <RadioCard.ItemControl
                              px={5}
                              py={3}
                              minW={20}
                              justifyContent="center"
                            >
                              <RadioCard.ItemText>
                                {hour}:00
                              </RadioCard.ItemText>
                            </RadioCard.ItemControl>
                          </RadioCard.Item>
                        ))}
                      </HStack>
                    </RadioCard.Root>
                  </Field.Root>
                </motion.div>
              )}

              {index === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="yellow.300" mb={4}>Seus Dados</Heading>

                  <SimpleGrid columns={2} gap={4}>
                    <Field.Root invalid={!!errors.fullname} required>
                      <Field.Label color="yellow.300">
                        Nome completo
                        <Field.RequiredIndicator />
                      </Field.Label>

                      <Input type="email" colorPalette="yellow" size="lg" rounded="lg" {...register("fullname")} />

                      <Field.ErrorText>{errors.fullname?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.phone} required>
                      <Field.Label color="yellow.300">
                        Telefone
                        <Field.RequiredIndicator />
                      </Field.Label>

                      <Input colorPalette="yellow" size="lg" rounded="lg" {...register("phone")} />

                      <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.model} required>
                      <Field.Label color="yellow.300">
                        Modelo do carro
                        <Field.RequiredIndicator />
                      </Field.Label>

                      <Input colorPalette="yellow" size="lg" rounded="lg" {...register("model")} />

                      <Field.ErrorText>{errors.model?.message}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.licensePlate} required>
                      <Field.Label color="yellow.300">
                        Placa
                        <Field.RequiredIndicator />
                      </Field.Label>

                      <Input colorPalette="yellow" size="lg" rounded="lg" {...register("licensePlate")} />

                      <Field.ErrorText>{errors.licensePlate?.message}</Field.ErrorText>
                    </Field.Root>
                  </SimpleGrid>
                </motion.div>
              )}
            </Steps.Content>
          ))}

          <HStack w="100%" justify="end">
            {steps.value === 2 && <Button type="submit" size="lg" colorPalette="yellow" rounded="lg">Confirmar agendamento</Button>}

            {steps.value !== 2 &&
              <Steps.NextTrigger asChild>
                <Button size="lg" colorPalette="yellow" rounded="lg" disabled={!value}>Continuar</Button>
              </Steps.NextTrigger>
            }
          </HStack>
        </Steps.RootProvider>
      </VStack>
    </VStack >
  )
}

const items = [
  {
    title: "Step 1",
    description: "Step 1 description",
  },
  {
    title: "Step 2",
    description: "Step 2 description",
  },
  {
    title: "Step 3",
    description: "Step 3 description",
  },
]